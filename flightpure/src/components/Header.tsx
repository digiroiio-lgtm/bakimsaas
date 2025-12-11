const Header = () => {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white/90 backdrop-blur shadow-header">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-white font-semibold">
            FP
          </div>
          <div className="text-lg font-semibold text-slate-900">Flight Pure</div>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition">
            Log in
          </button>
          <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
