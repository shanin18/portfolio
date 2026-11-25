import { useCallback, useEffect, useMemo, useState } from "react";
import { markOwner } from "../lib/track";

const KEY_STORE = "pf_stats_key";
const ACCENT = "#ff5533";
const TZ = "Asia/Dhaka";

const regionNames = (() => {
  try {
    return new Intl.DisplayNames(["en"], { type: "region" });
  } catch {
    return null;
  }
})();
const countryName = (code) => {
  if (!code || code === "??") return "Unknown";
  try {
    return regionNames?.of(code) || code;
  } catch {
    return code;
  }
};
// Country-code badge (flag emoji don't render on Windows).
const Flag = ({ code }) => (
  <span className="mr-1.5 inline-block w-7 rounded border border-white/10 bg-white/[0.04] text-center font-mono text-[10px] leading-4 text-[#a8a29e]">
    {code && /^[A-Z]{2}$/.test(code) ? code : "--"}
  </span>
);

const dayKey = (d) => d.toLocaleDateString("en-CA", { timeZone: TZ });
const fmtTime = (t) => new Date(t).toLocaleString("en-GB", { timeZone: TZ, dateStyle: "medium", timeStyle: "short" });
const ago = (t) => {
  const s = Math.round((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  return `${Math.floor(s / 86400)} d ago`;
};
const place = (v) => [v.city, countryName(v.country)].filter(Boolean).join(", ");

function Tile({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] bg-[#141210] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[#8a837c]">{label}</p>
      <p className="mt-2 font-['Bricolage_Grotesque'] text-4xl font-bold tabular-nums text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-[#8a837c]">{hint}</p>}
    </div>
  );
}

function Card({ title, children, right }) {
  return (
    <section className="rounded-2xl border border-white/[0.07] bg-[#141210] p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

// Single-series horizontal bars: one hue, values in ink, row is the hover target.
function BarList({ data, limit = 8, label = (k) => k, icon }) {
  const rows = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const shown = rows.slice(0, limit);
  const rest = rows.slice(limit).reduce((n, [, v]) => n + v, 0);
  if (rest) shown.push(["__other", rest]);
  const total = rows.reduce((n, [, v]) => n + v, 0) || 1;
  const max = Math.max(...shown.map(([, v]) => v), 1);
  if (!rows.length) return <p className="text-sm text-[#8a837c]">No data yet.</p>;
  return (
    <ul className="space-y-2.5">
      {shown.map(([k, v]) => (
        <li key={k} className="group" title={`${k === "__other" ? "Other" : label(k)}: ${v} visits (${Math.round((v / total) * 100)}%)`}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span className="truncate text-[#e7e2dc]">
              {icon && k !== "__other" && icon(k)}
              {k === "__other" ? "Other" : label(k)}
            </span>
            <span className="tabular-nums text-[#8a837c] group-hover:text-white">
              {v} <span className="text-xs">· {Math.round((v / total) * 100)}%</span>
            </span>
          </div>
          <div className="h-2 rounded-full bg-white/[0.05]">
            <div className="h-2 rounded-full" style={{ width: `${Math.max((v / max) * 100, 2)}%`, background: ACCENT }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

// Visits per day, last 30 days. Columns anchored to the baseline with a hover tooltip.
function DaysChart({ days }) {
  const [hover, setHover] = useState(null);
  const series = useMemo(() => {
    const out = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400000);
      const k = dayKey(d);
      out.push({ k, label: d.toLocaleDateString("en-GB", { timeZone: TZ, day: "numeric", month: "short" }), v: days[k] || 0 });
    }
    return out;
  }, [days]);
  const max = Math.max(...series.map((d) => d.v), 1);
  const sum = series.reduce((n, d) => n + d.v, 0);
  return (
    <div>
      <div className="relative flex h-40 items-end gap-[2px] border-b border-white/10" role="img" aria-label={`${sum} visits in the last 30 days`}>
        {series.map((d, i) => (
          <div
            key={d.k}
            className="relative flex h-full flex-1 cursor-default items-end"
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <div
              className="w-full rounded-t-[4px] transition-opacity"
              style={{ height: d.v ? `${Math.max((d.v / max) * 100, 3)}%` : 0, background: ACCENT, opacity: hover === null || hover === i ? 1 : 0.45 }}
            />
            {hover === i && (
              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-[#0b0a09] px-2.5 py-1.5 text-xs shadow-xl">
                <span className="text-[#8a837c]">{d.label}</span> <span className="font-semibold text-white">{d.v} visits</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-[#6b645e]">
        <span>{series[0].label}</span>
        <span>Today</span>
      </div>
    </div>
  );
}

function KeyGate({ onSubmit, error, loading }) {
  const [val, setVal] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(val.trim());
        }}
        className="w-full max-w-sm rounded-2xl border border-white/[0.07] bg-[#141210] p-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffab1a]">{"// Private"}</p>
        <h1 className="mt-1 text-2xl font-bold text-white">Visitor stats</h1>
        <p className="mt-2 text-sm text-[#8a837c]">Enter your STATS_KEY. It stays saved on this device.</p>
        <input
          type="password"
          autoFocus
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="mt-5 w-full rounded-xl border border-white/10 bg-[#0b0a09] px-4 py-3 text-white outline-none focus:border-[#ff5533]"
          placeholder="Stats key"
        />
        {error && <p className="mt-3 text-sm text-[#ff7a59]">{error}</p>}
        <button disabled={loading || !val} className="mt-4 w-full rounded-xl bg-[#ff5533] py-3 font-semibold text-white disabled:opacity-50">
          {loading ? "Checking…" : "Open dashboard"}
        </button>
      </form>
    </div>
  );
}

export default function Stats() {
  const [key, setKey] = useState(() => localStorage.getItem(KEY_STORE) || "");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [namedOnly, setNamedOnly] = useState(false);

  useEffect(() => {
    document.title = "Visitor stats · shamim.dev";
    const m = document.createElement("meta");
    m.name = "robots";
    m.content = "noindex";
    document.head.appendChild(m);
  }, []);

  const load = useCallback(async (k) => {
    if (!k) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats", { headers: { "x-stats-key": k } });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`);
      localStorage.setItem(KEY_STORE, k);
      markOwner(); // stop counting your own visits from this device
      setKey(k);
      setData(json);
    } catch (e) {
      setError(e.message);
      if (/wrong key/i.test(e.message)) {
        localStorage.removeItem(KEY_STORE);
        setKey("");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (key) load(key);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const derived = useMemo(() => {
    if (!data) return null;
    const today = dayKey(new Date());
    const cities = {};
    const people = new Map();
    for (const v of data.visits) {
      if (v.city) {
        const c = `${v.city}, ${countryName(v.country)}`;
        cities[c] = (cities[c] || 0) + 1;
      }
      if (v.who && !people.has(v.vid)) people.set(v.vid, { ...v.who, last: v.t, place: place(v), device: v.device });
    }
    return { today: data.days[today] || 0, cities, people: [...people.values()] };
  }, [data]);

  const visits = useMemo(() => {
    if (!data) return [];
    const s = q.trim().toLowerCase();
    return data.visits.filter((v) => {
      if (namedOnly && !v.who) return false;
      if (!s) return true;
      return [v.who?.name, v.who?.email, v.src, v.city, v.region, countryName(v.country), v.device, v.os, v.browser, v.ref]
        .filter(Boolean)
        .some((x) => x.toLowerCase().includes(s));
    });
  }, [data, q, namedOnly]);

  if (!data) {
    if (key && loading) return <div className="flex min-h-screen items-center justify-center text-[#8a837c]">Loading stats…</div>;
    return <KeyGate onSubmit={load} error={error} loading={loading} />;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#ffab1a]">{"// Private dashboard"}</p>
          <h1 className="mt-1 text-3xl font-bold text-white sm:text-4xl">Who visited your portfolio</h1>
          <p className="mt-1 text-sm text-[#8a837c]">Your own visits from this device are not counted. Times are Dhaka time.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => load(key)} className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white hover:border-[#ff5533]">
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem(KEY_STORE);
              setKey("");
              setData(null);
            }}
            className="rounded-xl border border-white/10 px-4 py-2 text-sm text-[#8a837c] hover:text-white"
          >
            Lock
          </button>
          <a href="/" className="rounded-xl border border-white/10 px-4 py-2 text-sm text-[#8a837c] hover:text-white">Site →</a>
        </div>
      </header>
      {error && <p className="mb-4 text-sm text-[#ff7a59]">{error}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Tile label="Total visits" value={data.total.toLocaleString()} hint="One per browser session" />
        <Tile label="Unique visitors" value={data.unique.toLocaleString()} hint="Distinct browsers (approx.)" />
        <Tile label="Visits today" value={derived.today.toLocaleString()} />
        <Tile label="Countries" value={Object.keys(data.country).filter((c) => c !== "??").length} />
      </div>

      <div className="mt-4">
        <Card title="Visits per day · last 30 days">
          <DaysChart days={data.days} />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card title="Countries">
          <BarList data={data.country} label={countryName} icon={(c) => <Flag code={c} />} />
        </Card>
        <Card title="Cities" right={<span className="text-xs text-[#6b645e]">last {data.visits.length} visits</span>}>
          <BarList data={derived.cities} />
        </Card>
        <Card title="Where visitors came from" right={<span className="text-xs text-[#6b645e]">#tag = your ?ref= link</span>}>
          <BarList data={data.source || {}} />
        </Card>
        <Card title="Most clicked" right={<span className="text-xs text-[#6b645e]">projects, socials, résumé</span>}>
          <BarList data={data.clicks || {}} limit={10} />
        </Card>
        <Card title="Devices">
          <BarList data={data.device} />
        </Card>
        <Card title="Operating systems">
          <BarList data={data.os} />
        </Card>
        <Card title="Browsers">
          <BarList data={data.browser} />
        </Card>
        <Card title="People who left their name" right={<span className="text-xs text-[#6b645e]">from the contact form</span>}>
          {derived.people.length ? (
            <ul className="divide-y divide-white/[0.06]">
              {derived.people.map((p) => (
                <li key={p.email + p.last} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{p.name}</p>
                    <a href={`mailto:${p.email}`} className="truncate text-xs text-[#ff7a59]">{p.email}</a>
                  </div>
                  <div className="shrink-0 text-right text-xs text-[#8a837c]">
                    <p>{p.place}</p>
                    <p>{p.device} · {ago(p.last)}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#8a837c]">
              Nobody yet. Visitors are anonymous; a name shows up here once someone sends the contact form.
            </p>
          )}
        </Card>
      </div>

      <div className="mt-4">
        <Card title="Recent clicks">
          {data.events?.length ? (
            <ul className="divide-y divide-white/[0.06]">
              {data.events.slice(0, 15).map((e, i) => (
                <li key={e.t + e.vid + i} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                  <span className="min-w-0 truncate text-[#e7e2dc]">{e.label}</span>
                  <span className="shrink-0 text-right text-xs text-[#8a837c]">
                    {e.who ? <span className="text-white">{e.who.name}</span> : `Visitor #${e.vid.slice(0, 4)}`} · <Flag code={e.country} />
                    {place(e)} · {e.device} ·{" "}
                    <span title={fmtTime(e.t)}>{ago(e.t)}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#8a837c]">No clicks yet. Clicks on project links, socials, email and your résumé show up here.</p>
          )}
        </Card>
      </div>

      <div className="mt-4">
        <Card
          title={`Recent visits (${visits.length})`}
          right={
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-xs text-[#8a837c]">
                <input type="checkbox" checked={namedOnly} onChange={(e) => setNamedOnly(e.target.checked)} className="accent-[#ff5533]" />
                Named only
              </label>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search city, device, name…"
                className="w-48 rounded-lg border border-white/10 bg-[#0b0a09] px-3 py-1.5 text-sm text-white outline-none focus:border-[#ff5533]"
              />
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-[#6b645e]">
                <tr className="border-b border-white/[0.07]">
                  <th className="py-2 pr-4 font-medium">When</th>
                  <th className="py-2 pr-4 font-medium">Who</th>
                  <th className="py-2 pr-4 font-medium">Location</th>
                  <th className="py-2 pr-4 font-medium">Device</th>
                  <th className="py-2 pr-4 font-medium">Came from</th>
                </tr>
              </thead>
              <tbody>
                {visits.slice(0, 200).map((v, i) => (
                  <tr key={v.t + v.vid + i} className="border-b border-white/[0.04] align-top hover:bg-white/[0.02]">
                    <td className="py-2.5 pr-4 text-[#e7e2dc]" title={fmtTime(v.t)}>
                      {ago(v.t)}
                    </td>
                    <td className="py-2.5 pr-4">
                      {v.who ? (
                        <span className="font-medium text-white" title={v.who.email}>{v.who.name}</span>
                      ) : (
                        <span className="text-[#8a837c]">
                          Visitor #{v.vid.slice(0, 4)}
                          {v.firstSeen < v.t - 60000 && <span className="ml-1.5 text-xs text-[#6b645e]">(returning)</span>}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 pr-4 text-[#e7e2dc]">
                      <Flag code={v.country} />
                      {place(v)}
                      {v.region && <span className="text-xs text-[#6b645e]"> · {v.region}</span>}
                    </td>
                    <td className="py-2.5 pr-4 text-[#e7e2dc]">
                      {v.device} <span className="text-[#8a837c]">· {v.os} · {v.browser}</span>
                      {v.screen && <span className="block text-xs text-[#6b645e]">{v.screen}</span>}
                    </td>
                    <td className="py-2.5 pr-4 text-[#8a837c]">
                      {v.src ? <span className="text-[#ffab1a]">#{v.src}</span> : v.ref || "Direct"}
                      {v.src && v.ref && <span className="block text-xs text-[#6b645e]">via {v.ref}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!visits.length && <p className="py-6 text-center text-sm text-[#8a837c]">No visits match.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
