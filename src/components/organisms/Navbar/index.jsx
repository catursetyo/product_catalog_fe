import { Link, NavLink } from "react-router";

const linkBase =
  "rounded-lg px-3 py-2 text-sm font-semibold transition-colors";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-brand shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/products" className="flex items-center gap-2 text-white">
          <img
            className="size-8 rounded-md bg-white object-contain"
            src="/logo.png"
            alt=""
          />
          <span className="text-xl font-extrabold tracking-tight">
            BukanLapak
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="flex items-center gap-1">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            Produk
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
