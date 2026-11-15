import { useState } from "react";
import { nextId, seed } from "./data.js";
import ProductCard from "./components/ProductCard.jsx";
import ProductForm from "./components/ProductForm.jsx";
import DeleteDialog from "./components/DeleteDialog.jsx";

export default function App() {
  const [products, setProducts] = useState(seed);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const close = () => setModal(null);

  const target = modal?.id ? products.find((p) => p.id === modal.id) : null;
  const shown = products.filter((p) =>
    p.name.toLowerCase().includes(query.trim().toLowerCase())
  );

  const save = (name, price) => {
    setProducts((ps) =>
      modal.type === "add"
        ? [...ps, { id: nextId(ps), name, price }]
        : ps.map((p) => (p.id === modal.id ? { ...p, name, price } : p))
    );
    close();
  };

  const remove = () => {
    setProducts((ps) => ps.filter((p) => p.id !== modal.id));
    close();
  };

  return (
    <>
      <main className="container">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h1>Manajemen Produk</h1>
              <p className="sub">Kelola daftar produk dan harga dalam satu tempat.</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setModal({ type: "add" })}
            >
              + Tambah Produk
            </button>
          </div>

          <div className="toolbar">
            <label className="search">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari nama produk..."
              />
            </label>
            <span className="count">{products.length} produk</span>
          </div>

          <div className="grid">
            {shown.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={() => setModal({ type: "edit", id: p.id })}
                onDelete={() => setModal({ type: "delete", id: p.id })}
              />
            ))}
          </div>

          {shown.length === 0 && (
            <p className="empty">Produk tidak ditemukan.</p>
          )}

          <p className="panel-foot">
            Menampilkan {shown.length} dari {products.length} produk
          </p>
        </section>
      </main>

      {modal?.type === "add" && (
        <ProductForm
          title="Tambah Produk"
          sub="Masukkan informasi produk baru."
          onSave={save}
          onClose={close}
        />
      )}
      {modal?.type === "edit" && (
        <ProductForm
          title="Edit Produk"
          sub="Perbarui informasi produk yang sudah ada."
          product={target}
          onSave={save}
          onClose={close}
        />
      )}
      {modal?.type === "delete" && (
        <DeleteDialog product={target} onConfirm={remove} onClose={close} />
      )}
    </>
  );
}
