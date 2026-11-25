import { useEffect, useState } from "react";

// Drop your CV at public/resume.pdf and the "Résumé" buttons appear on their own.
// Until that file exists they stay hidden, so the site never shows a broken download.
export const RESUME_URL = "/resume.pdf";

let check;
const resumeExists = () =>
  (check ||= fetch(RESUME_URL, { method: "HEAD" })
    .then((r) => r.ok && (r.headers.get("content-type") || "").includes("pdf"))
    .catch(() => false));

export function useResume() {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    let live = true;
    resumeExists().then((ok) => live && ok && setUrl(RESUME_URL));
    return () => {
      live = false;
    };
  }, []);
  return url;
}
