// Vercel serverless function: GET /api/stats  (header x-stats-key: <STATS_KEY>)
// Returns visitor totals, breakdowns and recent visits for the private /stats dashboard.
import crypto from "node:crypto";
import { K, pipeline, redisReady, toObject } from "./_lib/redis.js";

const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};

const nums = (o) => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, Number(v)]));

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }
  const key = (process.env.STATS_KEY || "").trim();
  if (!key) return res.status(500).json({ ok: false, error: "STATS_KEY is not set on the server." });
  if (!safeEqual(req.headers["x-stats-key"] || "", key)) return res.status(401).json({ ok: false, error: "Wrong key." });
  if (!redisReady()) return res.status(500).json({ ok: false, error: "Redis is not connected (KV_REST_API_URL / KV_REST_API_TOKEN)." });

  try {
    const [total, unique, country, device, os, browser, days, source, clicks, rawVisits, rawEvents] = await pipeline([
      ["GET", K.total],
      ["PFCOUNT", K.uniq],
      ["HGETALL", K.country],
      ["HGETALL", K.device],
      ["HGETALL", K.os],
      ["HGETALL", K.browser],
      ["HGETALL", K.days],
      ["HGETALL", K.source],
      ["HGETALL", K.clicks],
      ["LRANGE", K.visits, 0, 499],
      ["LRANGE", K.events, 0, 99],
    ]);

    const parse = (list) =>
      (list || [])
        .map((s) => {
          try {
            return JSON.parse(s);
          } catch {
            return null;
          }
        })
        .filter(Boolean);
    const visits = parse(rawVisits);
    const events = parse(rawEvents);

    // Names only exist for visitors who sent the contact form.
    const vids = [...new Set([...visits, ...events].map((v) => v.vid))];
    let names = {};
    let firstSeen = {};
    if (vids.length) {
      const [n, f] = await pipeline([["HMGET", K.names, ...vids], ["HMGET", K.first, ...vids]]);
      vids.forEach((vid, i) => {
        if (n[i]) {
          try {
            names[vid] = JSON.parse(n[i]);
          } catch {
            /* ignore */
          }
        }
        if (f[i]) firstSeen[vid] = Number(f[i]);
      });
    }

    return res.status(200).json({
      ok: true,
      total: Number(total || 0),
      unique: Number(unique || 0),
      country: nums(toObject(country)),
      device: nums(toObject(device)),
      os: nums(toObject(os)),
      browser: nums(toObject(browser)),
      days: nums(toObject(days)),
      source: nums(toObject(source)),
      clicks: nums(toObject(clicks)),
      events: events.map((e) => ({ ...e, who: names[e.vid] || null })),
      visits: visits.map((v) => ({ ...v, who: names[v.vid] || null, firstSeen: firstSeen[v.vid] || v.t })),
    });
  } catch (err) {
    console.error("stats error", err && err.message);
    return res.status(502).json({ ok: false, error: "Could not read stats." });
  }
}
