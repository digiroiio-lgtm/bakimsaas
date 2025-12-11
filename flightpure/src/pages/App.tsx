import { FormEvent, useMemo, useState } from "react";
import Header from "../components/Header";

type SelectedMainMode = "mid-lease" | "pre-lease" | "pre-purchase" | null;
type MidLeaseView = "completed" | "new";
type FilterType = "All types" | "737-800" | "A320-200" | "767-300";

type Inspection = {
  msn: string;
  type: string;
};

const initialInspections: Inspection[] = [
  { msn: "MSN 11111", type: "737-800" },
  { msn: "MSN 22222", type: "737-800" },
  { msn: "MSN 33333", type: "A320-200" },
  { msn: "MSN 44444", type: "767-300" },
];

const mainOptions: { label: string; value: Exclude<SelectedMainMode, null> }[] = [
  { label: "Airplane Mid-lease Inspection", value: "mid-lease" },
  { label: "Airplane Pre-lease Inspection", value: "pre-lease" },
  { label: "Airplane Pre-purchase Inspecion", value: "pre-purchase" },
];

const App = () => {
  const [selectedMainMode, setSelectedMainMode] = useState<SelectedMainMode>(null);
  const [midLeaseView, setMidLeaseView] = useState<MidLeaseView>("completed");
  const [inspections, setInspections] = useState<Inspection[]>(initialInspections);
  const [filterType, setFilterType] = useState<FilterType>("All types");
  const [sortAsc, setSortAsc] = useState(true);
  const [newMsn, setNewMsn] = useState("");
  const [newType, setNewType] = useState("");

  const filteredInspections = useMemo(() => {
    let list = [...inspections];
    if (filterType !== "All types") {
      list = list.filter((inspection) => inspection.type === filterType);
    }
    list.sort((a, b) => {
      const comparison = a.type.localeCompare(b.type) || a.msn.localeCompare(b.msn);
      return sortAsc ? comparison : -comparison;
    });
    return list;
  }, [inspections, filterType, sortAsc]);

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMsn = newMsn.trim();
    const trimmedType = newType.trim();
    if (!trimmedMsn || !trimmedType) return;

    const entry: Inspection = { msn: trimmedMsn, type: trimmedType };
    setInspections((prev) => [entry, ...prev]);
    setNewMsn("");
    setNewType("");
  };

  const renderMidLeaseContent = () => {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Inspection flow
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">
              Airplane Mid-lease Inspection
            </h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
            3-column layout
          </span>
        </div>
        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 lg:w-1/6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Menü
            </p>
            <div className="flex flex-col gap-2">
              {[
                { key: "completed", label: "Completed Inspections" },
                { key: "new", label: "New Inspection" },
              ].map((item) => {
                const isActive = midLeaseView === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setMidLeaseView(item.key as MidLeaseView)}
                    className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-white text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="w-full rounded-xl border border-slate-200 bg-white p-4 lg:w-1/3">
            {midLeaseView === "completed" ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex flex-col text-sm font-medium text-slate-700">
                      Uçak tipi
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as FilterType)}
                        className="mt-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-inner focus:border-slate-400 focus:outline-none"
                      >
                        <option>All types</option>
                        <option>737-800</option>
                        <option>A320-200</option>
                        <option>767-300</option>
                      </select>
                    </label>
                    <button
                      onClick={() => setSortAsc((prev) => !prev)}
                      className="mt-2 inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:mt-0"
                    >
                      Sort by Type {sortAsc ? "↑" : "↓"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">
                    Liste seçime göre filtrelenir ve uçak tipine göre alfabetik sıralanır.
                  </p>
                </div>

                <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                  {filteredInspections.map((inspection) => (
                    <div
                      key={`${inspection.msn}-${inspection.type}`}
                      className="flex items-center justify-between px-4 py-3 transition hover:bg-slate-50"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {inspection.msn}
                        </p>
                        <p className="text-xs text-slate-500">{inspection.type}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        Completed
                      </span>
                    </div>
                  ))}
                  {!filteredInspections.length && (
                    <div className="px-4 py-6 text-center text-sm text-slate-500">
                      Bu filtre ile kayıt bulunamadı.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">MSN</label>
                  <input
                    value={newMsn}
                    onChange={(e) => setNewMsn(e.target.value)}
                    placeholder="MSN 55555"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-inner focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">Tip</label>
                  <input
                    value={newType}
                    onChange={(e) => setNewType(e.target.value)}
                    placeholder="737-800"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 shadow-inner focus:border-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Save Inspection
                </button>
                <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  Preview: {newMsn || "MSN xxxxx"} ({newType || "tip"})
                </div>
              </form>
            )}
          </section>

          <section className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-700 lg:flex-1">
            <h3 className="text-sm font-semibold text-slate-800">Detail placeholder</h3>
            <p className="mt-2 text-sm">
              Select an inspection from the middle column to see details here in the future.
              Bu alan ileride detay kartları ve checklist özetleri için ayrıldı.
            </p>
          </section>
        </div>
      </section>
    );
  };

  const renderPlaceholder = (title: string) => (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">
        This workflow will be implemented in the next iteration.
      </p>
    </section>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="mb-8 space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Flight Pure</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Inspection modunu seçin
          </h1>
          <div className="mx-auto mt-4 grid max-w-md gap-4">
            {mainOptions.map((option) => {
              const isActive = selectedMainMode === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setSelectedMainMode(option.value)}
                  className={`w-full rounded-xl border px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        {!selectedMainMode && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-5 text-center text-sm text-slate-600">
            Lütfen bir işlem türü seçin.
          </div>
        )}

        {selectedMainMode === "mid-lease" && renderMidLeaseContent()}
        {selectedMainMode === "pre-lease" &&
          renderPlaceholder("Airplane Pre-lease Inspection")}
        {selectedMainMode === "pre-purchase" &&
          renderPlaceholder("Airplane Pre-purchase Inspecion")}
      </main>
    </div>
  );
};

export default App;
