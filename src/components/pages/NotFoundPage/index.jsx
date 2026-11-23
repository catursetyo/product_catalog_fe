import { Link } from "react-router";

const primaryLinkClass =
  "inline-flex min-h-10 items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark";
const secondaryLinkClass =
  "inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50";

export default function NotFoundPage() {
  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm sm:p-12">
      <p className="text-6xl font-extrabold tracking-tight text-brand">404</p>
      <h1 className="mt-3 text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Alamat yang Anda buka tidak terdaftar. Periksa kembali URL-nya atau
        kembali ke halaman utama.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
        <Link to="/" className={primaryLinkClass}>
          Kembali ke halaman utama
        </Link>
        <Link to="/products" className={secondaryLinkClass}>
          Lihat daftar produk
        </Link>
      </div>
    </section>
  );
}
