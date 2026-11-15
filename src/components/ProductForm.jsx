import { useState } from "react";
import Modal from "./Modal.jsx";

export default function ProductForm({ title, sub, product, onSave, onClose }) {
  const [name, setName] = useState(product ? product.name : "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const valid = name.trim() !== "" && price !== "" && Number(price) >= 0;

  return (
    <Modal>
      <div className="modal-head">
        <h3>{title}</h3>
        <button className="icon-btn" onClick={onClose} aria-label="Tutup">
          ×
        </button>
      </div>
      <p className="modal-sub">{sub}</p>
      {product && <p className="modal-id">{product.id}</p>}
      <label className="field">
        <span>Nama Produk</span>
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Pulpen"
        />
      </label>
      <label className="field">
        <span>Harga (Rp)</span>
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Contoh: 5000"
        />
        <small>Isi harga dalam Rupiah, tanpa titik.</small>
      </label>
      <div className="modal-actions">
        <button className="btn btn-outline" onClick={onClose}>
          Batal
        </button>
        <button
          className="btn btn-primary"
          disabled={!valid}
          onClick={() => onSave(name.trim(), Number(price))}
        >
          {product ? "Simpan Perubahan" : "Simpan Produk"}
        </button>
      </div>
    </Modal>
  );
}
