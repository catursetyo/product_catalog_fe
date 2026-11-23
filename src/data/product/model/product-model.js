// Validates a product payload and exposes the data used by the interface.
export default class ProductModel {
  constructor({ id, name, price }) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getPrice() {
    return this.price;
  }

  toJSON() {
    return { id: this.id, name: this.name, price: this.price };
  }

  static fromResponse(data) {
    if (typeof data !== "object" || data === null) {
      throw new TypeError("Format produk dari API tidak valid.");
    }

    const { id, name, price } = data;

    if (
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isInteger(price) ||
      price < 0
    ) {
      throw new TypeError("Format produk dari API tidak valid.");
    }

    return new ProductModel({ id, name: name.trim(), price });
  }
}
