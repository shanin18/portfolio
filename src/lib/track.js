// Anonymous visit tracking. Sends one beacon per browser tab session to /api/track.
const VID_KEY = "pf_vid";
const OWNER_KEY = "pf_owner"; // set on this device after you unlock /stats, so your own visits are skipped

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

export function trackVisit() {
  if (import.meta.env.DEV) return;
  try {
    if (localStorage.getItem(OWNER_KEY) === "1") return;
    if (sessionStorage.getItem("pf_tracked")) return;
    sessionStorage.setItem("pf_tracked", "1");
  } catch {
    /* storage blocked: still count the visit */
  }
  const body = JSON.stringify({
    vid: getVisitorId(),
    path: location.pathname,
    ref: document.referrer,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}x${screen.height}`,
  });
  fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body, keepalive: true }).catch(() => {});
}
