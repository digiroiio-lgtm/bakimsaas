"use client";

import { useMemo, useState } from "react";

type ModeKey = "mid-lease" | "pre-lease" | "pre-purchase";

const modes: Record<
  ModeKey,
  {
    title: string;
    summary: string;
  }
> = {
  "mid-lease": {
    title: "Airplane Mid-lease Inspection",
    summary: "Monitor cabin quality, powerplant cycles, and compliance in one pass.",
  },
  "pre-lease": {
    title: "Airplane Pre-lease Inspection",
    summary: "Verify asset readiness and delivery guarantees before transfer.",
  },
  "pre-purchase": {
    title: "Airplane Pre-purchase Inspecion",
    summary: "Capture valuation snapshots with logbook, structure, and avionics evidence.",
  },
};

const comfortChecks = [
  { label: "Cabin fixtures", trend: "stable" },
  { label: "Powerplant cycles", trend: "upcoming service" },
  { label: "Avionics flags", trend: "clear" },
];

export default function HomePage() {
  const [selectedMode, setSelectedMode] = useState<ModeKey>("mid-lease");
  const [activePanel, setActivePanel] = useState<"timeline" | "audit">("timeline");

  const panelHint = useMemo(() => {
    if (selectedMode !== "mid-lease") {
      return "Workflow preview will unlock with the upcoming release.";
    }
    if (activePanel === "timeline") {
      return "Timeline compresses daily findings, ferry notes, and ETOPS reminders.";
    }
    return "Audit prep unifies PDFs, logbooks, and heavy check milestones.";
  }, [selectedMode, activePanel]);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
              Aviation mission desk
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              Choose an inspection focus
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Each mode unlocks tailored checklists, documentation, and collaboration spaces.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-right">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Active mode
            </p>
            <p className="text-sm font-medium text-slate-800">{modes[selectedMode].title}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {Object.entries(modes).map(([key, item]) => {
            const isActive = key === selectedMode;
            return (
              <button
                key={key}
                onClick={() => setSelectedMode(key as ModeKey)}
                className={`rounded-2xl border px-5 py-6 text-left transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                    : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <p className="font-semibold">{item.title}</p>
                <p
                  className={`mt-2 text-sm ${
                    isActive ? "text-slate-200" : "text-slate-600"
                  }`}
                >
                  {item.summary}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Mode workspace
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                {modes[selectedMode].title}
              </h2>
            </div>
            {selectedMode === "mid-lease" && (
              <div className="flex gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                {["timeline", "audit"].map((panel) => {
                  const active = panel === activePanel;
                  return (
                    <button
                      key={panel}
                      onClick={() => setActivePanel(panel as "timeline" | "audit")}
                      className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                        active ? "bg-slate-900 text-white" : "text-slate-600"
                      }`}
                    >
                      {panel === "timeline" ? "Timeline" : "Audit prep"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {selectedMode === "mid-lease" ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Fleet pulse
                </p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  {comfortChecks.map((item) => (
                    <li key={item.label} className="flex items-center justify-between">
                      <span>{item.label}</span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-xs text-slate-500">
                        {item.trend}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Crew notes
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>Cabin lighting requires alignment before handback.</p>
                  <p>Lubrication kit ready for arrival in Doha hangar 3.</p>
                  <p>Awaiting logbook scan from AMO partner.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-900 bg-slate-900 p-4 text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                  Mission brief
                </p>
                <p className="mt-4 text-sm">
                  {panelHint}
                </p>
                <div className="mt-6 rounded-2xl border border-white/20 bg-white/5 p-4 text-slate-200">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Next handoff</p>
                  <p className="text-lg font-semibold">ETA 14:00Z · DXB North</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
              {panelHint}
            </div>
          )}
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Readiness
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Rapid briefing</h3>
          <ul className="mt-4 space-y-4 text-sm text-slate-700">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              <div>
                <p className="font-semibold">Documents synced</p>
                <p className="text-slate-500">All lease addendums verified this morning.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
              <div>
                <p className="font-semibold">Pending acceptance</p>
                <p className="text-slate-500">Awaiting QA signature for cabin refresh kit.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
              <div>
                <p className="font-semibold">External weather</p>
                <p className="text-slate-500">Ground handling alerts expected due to crosswinds.</p>
              </div>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
