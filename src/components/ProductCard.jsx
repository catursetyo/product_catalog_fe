import { rupiah } from "../data.js";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <article className="card">
      <span className="card-id">{product.id}</span>
      <h2 className="card-name">{product.name}</h2>
      <p className="card-price">{rupiah(product.price)}</p>
      <div className="card-actions">
        <button className="btn btn-edit" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-del" onClick={onDelete}>
          Hapus
        </button>
      </div>
    </article>
  );
}
