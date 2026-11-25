// Minimal Upstash Redis REST client (no dependency). Files under api/_lib are not deployed as functions.
// Works with the env vars Vercel's Upstash/KV integration sets: KV_REST_API_URL + KV_REST_API_TOKEN
// (or UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN).
const URL_ = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").trim();
const TOKEN = (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "").trim();

export const redisReady = () => Boolean(URL_ && TOKEN);

// Runs several commands in one round trip; returns each command's result in order.
export async function pipeline(commands) {
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis HTTP ${res.status}`);
  const out = await res.json();
  return out.map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

// HGETALL returns a flat [k, v, k, v] array.
export const toObject = (flat) => {
  const o = {};
  for (let i = 0; i < (flat || []).length; i += 2) o[flat[i]] = flat[i + 1];
  return o;
};

export const isVisitorId = (s) => typeof s === "string" && /^[a-z0-9-]{8,64}$/i.test(s);

export const K = {
  visits: "pf:visits", // list of visit JSON, newest first
  total: "pf:total",
  uniq: "pf:uniq", // HyperLogLog of visitor ids
  first: "pf:first", // hash vid -> first seen ms
  names: "pf:names", // hash vid -> {"name","email"} from the contact form
  country: "pf:country",
  device: "pf:device",
  os: "pf:os",
  browser: "pf:browser",
  days: "pf:days", // hash YYYY-MM-DD (Dhaka) -> visits
};

export const MAX_VISITS = 5000;
