// Anonymous visit + click tracking for the private /stats dashboard.
// One visit is sent per browser tab session; clicks on outbound links, email and the résumé are sent as they happen.
const VID_KEY = "pf_vid";
const OWNER_KEY = "pf_owner"; // set on this device after you unlock /stats, so your own activity is skipped

const newId = () =>
  (crypto.randomUUID && crypto.randomUUID()) ||
  Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 12);

export function getVisitorId() {
  try {
    let id = localStorage.getItem(VID_KEY);
    if (!id) {
      id = newId();
      localStorage.setItem(VID_KEY, id);
    }
    return id;
  } catch {
    return newId();
  }
}

export const markOwner = () => {
  try {
    localStorage.setItem(OWNER_KEY, "1");
  } catch {
    /* ignore */
  }
};

const skip = () => {
  if (import.meta.env.DEV) return true;
  try {
    return localStorage.getItem(OWNER_KEY) === "1";
  } catch {
    return false;
  }
};

const send = (payload) =>
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vid: getVisitorId(), ...payload }),
    keepalive: true,
  }).catch(() => {});

// Links you share can say where they were posted: ?ref=linkedin, ?ref=fiverr, ?utm_source=cv ...
// The tag is read once, then removed from the address bar so it isn't copied along.
function readSource() {
  const params = new URLSearchParams(location.search);
  const raw = params.get("ref") || params.get("utm_source") || params.get("source");
  if (!raw) return "";
  ["ref", "utm_source", "utm_medium", "utm_campaign", "source"].forEach((k) => params.delete(k));
  const qs = params.toString();
  history.replaceState(null, "", location.pathname + (qs ? `?${qs}` : "") + location.hash);
  return raw.toLowerCase().replace(/[^a-z0-9._-]/g, "").slice(0, 40);
}

export function trackVisit() {
  const src = readSource();
  if (skip()) return;
  try {
    if (sessionStorage.getItem("pf_tracked")) return;
    sessionStorage.setItem("pf_tracked", "1");
  } catch {
    /* storage blocked: still count the visit */
  }
  send({
    path: location.pathname,
    ref: document.referrer,
    src,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}x${screen.height}`,
  });
}

export function trackClick(label) {
  if (!label || skip()) return;
  send({ type: "click", label });
}

// Label for a clicked element: an explicit data-track wins, otherwise outbound links and email are named automatically.
function labelFor(el) {
  if (el.dataset.track) return el.dataset.track;
  const href = el.getAttribute("href") || "";
  if (href.startsWith("mailto:")) return "Email link";
  if (href.startsWith("tel:")) return "Phone link";
  try {
    const u = new URL(href, location.href);
    if (u.origin === location.origin) return /\.pdf$/i.test(u.pathname) ? `File: ${u.pathname}` : "";
    return `Outbound: ${u.hostname.replace(/^www\./, "")}${u.pathname === "/" ? "" : u.pathname}`.slice(0, 80);
  } catch {
    return "";
  }
}

export function initClickTracking() {
  document.addEventListener(
    "click",
    (e) => {
      const el = e.target.closest?.("[data-track], a[href]");
      if (el) trackClick(labelFor(el));
    },
    { capture: true, passive: true },
  );
}
