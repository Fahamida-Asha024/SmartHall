import Sidebar from "./Sidebar";

export default function Layout({ title, subtitle, actions, children }) {
  return (
    <div className="min-h-screen flex bg-brand-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* stronger, more visible color blobs */}
        <div className="pointer-events-none absolute -top-20 -right-16 w-[420px] h-[420px] bg-brand-300/60 rounded-full blur-2xl" />
        <div className="pointer-events-none absolute top-1/3 -left-24 w-80 h-80 bg-teal-300/50 rounded-full blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-72 h-72 bg-purple-300/40 rounded-full blur-2xl" />

        <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-gray-200/70 bg-white/60 backdrop-blur-md sticky top-0">
          <div>
            <h1 className="text-lg font-semibold text-gray-900 tracking-tight">{title}</h1>
            {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {actions}
        </header>

        <main className="relative z-10 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}