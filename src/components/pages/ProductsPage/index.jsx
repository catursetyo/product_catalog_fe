import { useEffect, useState } from "react";
import Button from "../../atoms/Button/index.jsx";
import DeleteDialog from "../../molecules/DeleteDialog/index.jsx";
import ProductForm from "../../molecules/ProductForm/index.jsx";
import ProductGrid from "../../organisms/ProductGrid/index.jsx";
import {
  createProduct,
  deleteProduct,
  getProductList,
  updateProduct,
} from "../../../data/product/repository/product-repository.js";

function messageOf(error, fallback) {
  return error instanceof Error ? error.message : fallback;
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setIsLoading(true);
      setError("");

      try {
        const models = await getProductList();

        if (active) {
          setProducts(models.map((model) => model.toJSON()));
        }
      } catch (loadError) {
        if (active) {
          setError(messageOf(loadError, "Gagal memuat produk."));
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
  }, []);

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const target =
    modal?.type === "edit" || modal?.type === "delete"
      ? products.find((product) => product.id === modal.id) ?? null
      : null;

  const closeModal = () => setModal(null);

  async function handleSave(values) {
    setIsSaving(true);
    setError("");
    setNotice("");

    try {
      if (modal?.type === "edit" && target) {
        const model = await updateProduct({ id: target.id, ...values });
        setProducts((items) =>
          items.map((item) =>
            item.id === model.getId() ? model.toJSON() : item
          )
        );
        setNotice("Produk berhasil diperbarui.");
      } else {
        const model = await createProduct(values);
        setProducts((items) => [...items, model.toJSON()]);
        setNotice("Produk berhasil ditambahkan.");
      }

      closeModal();
    } catch (saveError) {
      setError(messageOf(saveError, "Gagal menyimpan produk."));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!target) {
      return;
    }

    setIsDeleting(true);
    setError("");
    setNotice("");

    try {
      await deleteProduct(target.id);
      setProducts((items) => items.filter((item) => item.id !== target.id));
      setNotice("Produk berhasil dihapus.");
      closeModal();
    } catch (deleteError) {
      setError(messageOf(deleteError, "Gagal menghapus produk."));
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manajemen Produk</h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola daftar produk dan harga dalam satu tempat.
          </p>
        </div>
        <Button onClick={() => setModal({ type: "add" })}>
          + Tambah Produk
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-400 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20 sm:max-w-sm">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama produk..."
            aria-label="Cari nama produk"
            className="w-full border-0 bg-transparent text-sm text-ink outline-none placeholder:text-slate-400"
          />
        </label>
        <span className="text-sm text-slate-500">{products.length} produk</span>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      {notice && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          {notice}
        </p>
      )}

      <div className="mt-5">
        {isLoading ? (
          <p className="py-10 text-center text-sm text-slate-500">
            Memuat produk…
          </p>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">
            {products.length === 0
              ? "Belum ada produk. Tambahkan produk pertama Anda."
              : "Produk tidak ditemukan."}
          </p>
        ) : (
          <ProductGrid
            products={filtered}
            onEdit={(id) => setModal({ type: "edit", id })}
            onDelete={(id) => setModal({ type: "delete", id })}
          />
        )}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        Menampilkan {filtered.length} dari {products.length} produk
      </p>

      {modal?.type === "add" && (
        <ProductForm
          onSave={handleSave}
          onClose={closeModal}
          saving={isSaving}
        />
      )}
      {modal?.type === "edit" && target && (
        <ProductForm
          product={target}
          onSave={handleSave}
          onClose={closeModal}
          saving={isSaving}
        />
      )}
      {modal?.type === "delete" && target && (
        <DeleteDialog
          product={target}
          onConfirm={handleDelete}
          onClose={closeModal}
          deleting={isDeleting}
        />
      )}
    </section>
  );
}
