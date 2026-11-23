import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProductById } from "../../../data/product/repository/product-repository.js";
import { formatRupiah } from "../../../utils/formatRupiah.js";

const backLinkClass =
  "inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      setError("");
      setProduct(null);

      try {
        const model = await getProductById(id);

        if (active) {
          setProduct(model ? model.toJSON() : null);
        }
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Gagal memuat produk."
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [id]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link to="/products" className={backLinkClass}>
        <span aria-hidden="true">←</span> Kembali ke daftar produk
      </Link>

      {isLoading && (
        <p className="mt-6 rounded-2xl bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
          Memuat produk…
        </p>
      )}

      {!isLoading && error && (
        <section className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold">Produk tidak dapat dimuat</h1>
          <p role="alert" className="mt-2 text-sm text-slate-500">
            {error}
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Lihat semua produk
          </Link>
        </section>
      )}

      {!isLoading && !error && !product && (
        <section className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold">Produk tidak ditemukan</h1>
          <p className="mt-2 text-sm text-slate-500">
            Produk dengan ID {id} tidak tersedia. Mungkin produk sudah dihapus.
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex min-h-10 items-center justify-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            Lihat semua produk
          </Link>
        </section>
      )}

      {!isLoading && !error && product && (
        <article className="mt-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <span className="w-fit rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
            ID: {product.id}
          </span>
          <h1 className="mt-3 text-2xl font-bold wrap-break-word sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-3 text-3xl font-extrabold text-brand">
            {formatRupiah(product.price)}
          </p>

          <dl className="mt-6 grid gap-3 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">ID Produk</dt>
              <dd className="mt-1 font-semibold">{product.id}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Harga</dt>
              <dd className="mt-1 font-semibold">
                {formatRupiah(product.price)}
              </dd>
            </div>
          </dl>

          <Link
            to="/products"
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Kembali ke daftar produk
          </Link>
        </article>
      )}
    </div>
  );
}
