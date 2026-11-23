import Button from "../../atoms/Button/index.jsx";
import Modal from "../Modal/index.jsx";

export default function DeleteDialog({
  product,
  onConfirm,
  onClose,
  deleting = false,
}) {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <div className="mx-auto grid size-11 place-items-center rounded-full bg-brand-soft text-brand">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M3 6h18M9 6V4h6v2M5 6l1 14h12l1-14" />
          </svg>
        </div>
        <h2 className="mt-3 text-base font-bold">Hapus Produk?</h2>
        <p className="mt-1 text-xs text-slate-500">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>
        <p className="mt-3 wrap-break-word rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold">
          {product.name}
        </p>
        <div className="mt-5 flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={deleting}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? "Menghapus…" : "Hapus Produk"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
