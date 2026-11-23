import { useState } from "react";
import Button from "../../atoms/Button/index.jsx";
import Modal from "../Modal/index.jsx";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function ProductForm({
  product = null,
  onSave,
  onClose,
  saving = false,
}) {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? String(product.price) : "");

  const numericPrice = Number(price);
  const valid =
    name.trim() !== "" &&
    price !== "" &&
    Number.isInteger(numericPrice) &&
    numericPrice >= 0;

  function handleSubmit(event) {
    event.preventDefault();

    if (!valid || saving) {
      return;
    }

    onSave({ name: name.trim(), price: numericPrice });
  }

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold">
              {product ? "Edit Produk" : "Tambah Produk"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {product
                ? "Perbarui informasi produk yang sudah ada."
                : "Masukkan informasi produk baru."}
            </p>
          </div>
          <button
            type="button"
            className="cursor-pointer text-lg leading-none text-slate-400 hover:text-slate-600"
            onClick={onClose}
            aria-label="Tutup"
          >
            ×
          </button>
        </div>

        {product && (
          <p className="mt-3 w-fit rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-500">
            ID: {product.id}
          </p>
        )}

        <label className="mt-4 block text-xs font-semibold text-slate-700">
          Nama Produk
          <input
            autoFocus
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Contoh: Pulpen"
            className={inputClass}
          />
        </label>

        <label className="mt-3 block text-xs font-semibold text-slate-700">
          Harga (Rp)
          <input
            type="number"
            min="0"
            step="1"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="Contoh: 5000"
            className={inputClass}
          />
          <span className="mt-1 block text-[11px] font-normal text-slate-500">
            Isi harga dalam Rupiah, tanpa titik.
          </span>
        </label>

        <div className="mt-5 flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={saving}
          >
            Batal
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={!valid || saving}
          >
            {saving ? "Menyimpan…" : "Simpan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
