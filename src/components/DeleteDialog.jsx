import Modal from "./Modal.jsx";

export default function DeleteDialog({ product, onConfirm, onClose }) {
  return (
    <Modal center>
      <div className="trash">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14" />
        </svg>
      </div>
      <h3>Hapus Produk?</h3>
      <p className="modal-sub">Produk yang dihapus tidak dapat dikembalikan.</p>
      <p className="confirm-name">{product.name}</p>
      <div className="modal-actions">
        <button className="btn btn-outline" onClick={onClose}>
          Batal
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          Hapus Produk
        </button>
      </div>
    </Modal>
  );
}
