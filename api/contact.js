// Vercel serverless function: POST /api/contact
// Sends the portfolio contact form to your inbox over SMTP (Nodemailer) with a branded HTML template.
// Env vars: SMTP_USER, SMTP_PASS (Gmail: an App Password), optional SMTP_HOST, SMTP_PORT, CONTACT_TO.
import nodemailer from "nodemailer";
import { K, isVisitorId, pipeline, redisReady } from "./_lib/redis.js";

const TO = process.env.CONTACT_TO || "shamimhosan02@gmail.com";
const HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const PORT = Number(process.env.SMTP_PORT || 465);

const esc = (s = "") =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

function template({ name, email, message, sentAt }) {
  const msg = esc(message).replace(/\n/g, "<br>");
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Re: your message on shamim.dev")}`;
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark"><title>New portfolio message</title></head>
<body style="margin:0;padding:0;background:#0b0a09;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#f1f5f9;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(name)} sent you a message: ${esc(message).slice(0, 90)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0b0a09;padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
    <tr><td style="padding:0 4px 18px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="width:36px;height:36px;border:1px solid #ff553366;border-radius:10px;background:#ff55331a;color:#ffa58f;font:700 13px Consolas,monospace;text-align:center;">&lt;/&gt;</td>
        <td style="padding-left:10px;font:600 15px Consolas,monospace;color:#ffffff;">shamim<span style="color:#ff7a59;">.dev</span></td>
      </tr></table>
    </td></tr>
    <tr><td style="background:#141210;border:1px solid #2a2622;border-radius:18px;overflow:hidden;">
      <div style="height:4px;background:linear-gradient(90deg,#ff5533,#ffab1a);background-color:#ff5533;"></div>
      <div style="padding:28px 28px 8px;">
        <p style="margin:0 0 6px;font:600 11px Consolas,monospace;letter-spacing:2px;text-transform:uppercase;color:#ffab1a;">// New message</p>
        <h1 style="margin:0;font-size:24px;line-height:1.3;color:#ffffff;">${esc(name)} wants to get in touch</h1>
      </div>
      <div style="padding:16px 28px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2622;border-radius:12px;">
          <tr><td style="padding:12px 16px;border-bottom:1px solid #2a2622;font-size:12px;color:#8a837c;width:70px;">Name</td>
              <td style="padding:12px 16px;border-bottom:1px solid #2a2622;font-size:14px;color:#f1f5f9;">${esc(name)}</td></tr>
          <tr><td style="padding:12px 16px;font-size:12px;color:#8a837c;">Email</td>
              <td style="padding:12px 16px;font-size:14px;"><a href="mailto:${esc(email)}" style="color:#ff7a59;text-decoration:none;">${esc(email)}</a></td></tr>
        </table>
      </div>
      <div style="padding:20px 28px 0;">
        <p style="margin:0 0 8px;font-size:12px;color:#8a837c;">Message</p>
        <div style="background:#0f0d0c;border-left:3px solid #ff5533;border-radius:8px;padding:16px 18px;font-size:15px;line-height:1.7;color:#e7e2dc;">${msg}</div>
      </div>
      <div style="padding:26px 28px 30px;">
        <a href="${replyHref}" style="display:inline-block;background:#ff5533;color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:10px;">Reply to ${esc(name.split(" ")[0] || "sender")} &rarr;</a>
      </div>
    </td></tr>
    <tr><td style="padding:18px 4px 0;font-size:12px;color:#6b645e;line-height:1.6;">
      Sent from the contact form on <a href="https://shamim-hosan.vercel.app" style="color:#8a837c;">shamim-hosan.vercel.app</a> · ${esc(sentAt)}<br>
      Hitting reply in your mail app also answers ${esc(email)} directly.
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return res.status(500).json({ ok: false, error: "Email service not configured" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (body._honey) return res.status(200).json({ ok: true }); // silently drop bots

  const name = String(body.name || "").trim().slice(0, 100);
  const email = String(body.email || "").trim().slice(0, 200);
  const message = String(body.message || "").trim().slice(0, 5000);
  if (!name || !isEmail(email) || message.length < 2) {
    return res.status(400).json({ ok: false, error: "Please fill in your name, a valid email and a message." });
  }

  const sentAt = new Date().toLocaleString("en-GB", { timeZone: "Asia/Dhaka", dateStyle: "medium", timeStyle: "short" }) + " (Dhaka)";
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: PORT === 465,
      auth: { user: process.env.SMTP_USER.trim(), pass: process.env.SMTP_PASS.replace(/\s+/g, "") },
    });
    await transporter.sendMail({
      from: `"Portfolio · ${name.replace(/"/g, "")}" <${process.env.SMTP_USER.trim()}>`,
      to: TO,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New message from ${name} · Portfolio`,
      html: template({ name, email, message, sentAt }),
      text: `New portfolio message

Name: ${name}
Email: ${email}

${message}

${sentAt}`,
    });
  } catch (err) {
    console.error("SMTP error", err && err.message);
    return res.status(502).json({ ok: false, error: "Could not send right now." });
  }
  // Put a name to this visitor's visits on the /stats dashboard. Never blocks the reply on failure.
  if (redisReady() && isVisitorId(body.vid)) {
    await pipeline([["HSET", K.names, body.vid, JSON.stringify({ name, email })]]).catch((e) => console.error("names error", e && e.message));
  }
  return res.status(200).json({ ok: true });
}
