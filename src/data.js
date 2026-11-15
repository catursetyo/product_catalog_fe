export const seed = [
  { id: "ID-1", name: "Pulpen", price: 5000 },
  { id: "ID-2", name: "Buku Tulis", price: 12000 },
  { id: "ID-3", name: "Spidol", price: 8000 },
  { id: "ID-4", name: "Penggaris", price: 6000 },
  { id: "ID-5", name: "Penghapus", price: 3000 },
];

export const rupiah = (n) => "Rp" + n.toLocaleString("id-ID");

export const nextId = (products) =>
  "ID-" + (Math.max(0, ...products.map((p) => Number(p.id.slice(3)))) + 1);
