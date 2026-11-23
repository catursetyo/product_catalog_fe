import { Link } from "react-router";
import Button from "../../atoms/Button/index.jsx";
import { formatRupiah } from "../../../utils/formatRupiah.js";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="flex min-w-0 flex-col rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md">
      <span className="w-fit rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
        ID: {product.id}
      </span>

      <h2 className="mt-2 text-base font-semibold wrap-break-word">
        <Link to={`/products/${product.id}`} className="hover:text-brand">
          {product.name}
        </Link>
      </h2>
      <p className="mt-1 text-lg font-bold text-brand">
        {formatRupiah(product.price)}
      </p>

      <div className="mt-auto pt-4">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => onEdit(product.id)}
          >
            Edit
          </Button>
          <Button
            variant="subtleDanger"
            className="flex-1"
            onClick={() => onDelete(product.id)}
          >
            Hapus
          </Button>
        </div>
        <Link
          to={`/products/${product.id}`}
          className="mt-2 block text-center text-xs font-semibold text-brand hover:underline"
        >
          Lihat detail
        </Link>
      </div>
    </article>
  );
}
