import { Outlet } from "react-router";
import Navbar from "../../organisms/Navbar/index.jsx";

export default function PageLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white/60 py-5 text-center text-xs text-slate-500">
        BukanLapak · Manajemen Produk
      </footer>
    </div>
  );
}
