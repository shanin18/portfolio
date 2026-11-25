// Vercel serverless function: POST /api/track
// Records one visit: location from Vercel's geo headers, device/OS/browser from the user agent.
// No IP address is stored.
import { K, MAX_VISITS, isVisitorId, pipeline, redisReady } from "./_lib/redis.js";

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embedly|preview|headless|lighthouse|pingdom|monitor|curl|wget|python|axios|node-fetch/i;

function parseUA(ua = "") {
  const device = /iPad|Tablet|PlayBook|Silk|(Android(?!.*Mobile))/i.test(ua)
    ? "Tablet"
    : /Mobi|iPhone|iPod|Android|BlackBerry|Opera Mini|IEMobile/i.test(ua)
      ? "Mobile"
      : "Desktop";
  const os = /Windows/i.test(ua)
    ? "Windows"
    : /iPhone|iPad|iPod/i.test(ua)
      ? "iOS"
      : /Android/i.test(ua)
        ? "Android"
        : /CrOS/i.test(ua)
          ? "ChromeOS"
          : /Mac OS X|Macintosh/i.test(ua)
            ? "macOS"
            : /Linux/i.test(ua)
              ? "Linux"
              : "Other";
  const browser = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\/|Opera/i.test(ua)
      ? "Opera"
      : /SamsungBrowser/i.test(ua)
        ? "Samsung Internet"
        : /FBAN|FBAV|FB_IAB/i.test(ua)
          ? "Facebook app"
          : /Instagram/i.test(ua)
            ? "Instagram app"
            : /Firefox|FxiOS/i.test(ua)
              ? "Firefox"
              : /Chrome|CriOS/i.test(ua)
                ? "Chrome"
                : /Safari/i.test(ua)
                  ? "Safari"
                  : "Other";
  return { device, os, browser };
}

const header = (req, name) => {
  const v = req.headers[name];
  if (!v) return "";
  try {
    return decodeURIComponent(String(v));
  } catch {
    return String(v);
  }
};

const clip = (s, n) => String(s || "").slice(0, n);

const refHost = (ref) => {
  try {
    const h = new URL(ref).hostname.replace(/^www\./, "");
    return h && !/shamim|vercel\.app$|localhost/.test(h) ? h : "";
  } catch {
    return "";
  }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }
  if (!redisReady()) return res.status(204).end();

  const ua = String(req.headers["user-agent"] || "");
  if (!ua || BOT.test(ua)) return res.status(204).end();

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).end();
  }
  if (!isVisitorId(body.vid)) return res.status(400).end();

  const now = Date.now();
  const { device, os, browser } = parseUA(ua);
  const visit = {
    t: now,
    vid: body.vid,
    country: header(req, "x-vercel-ip-country") || "??",
    region: header(req, "x-vercel-ip-country-region"),
    city: header(req, "x-vercel-ip-city"),
    device,
    os,
    browser,
    path: clip(body.path, 120) || "/",
    ref: refHost(body.ref),
    lang: clip(body.lang, 20),
    tz: clip(body.tz, 50),
    screen: clip(body.screen, 20),
  };
  const day = new Date(now).toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" });

  try {
    await pipeline([
      ["LPUSH", K.visits, JSON.stringify(visit)],
      ["LTRIM", K.visits, 0, MAX_VISITS - 1],
      ["INCR", K.total],
      ["PFADD", K.uniq, visit.vid],
      ["HSETNX", K.first, visit.vid, now],
      ["HINCRBY", K.country, visit.country, 1],
      ["HINCRBY", K.device, device, 1],
      ["HINCRBY", K.os, os, 1],
      ["HINCRBY", K.browser, browser, 1],
      ["HINCRBY", K.days, day, 1],
    ]);
  } catch (err) {
    console.error("track error", err && err.message);
  }
  return res.status(204).end();
}
