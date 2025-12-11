const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative flex h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-sm font-semibold uppercase tracking-wide text-white">
              FP
            </div>
          </div>
          <p className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-sm font-semibold uppercase tracking-[0.35em] text-slate-700">
            Flight Pure
          </p>
          <div className="ml-auto">
            <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-100" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
