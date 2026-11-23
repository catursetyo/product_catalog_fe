import ProductModel from "../model/product-model.js";
import {
  createProductRemote,
  deleteProductRemote,
  getProductByIdRemote,
  getProductListRemote,
  updateProductRemote,
} from "../source/product-remote.js";

export async function getProductList() {
  const data = await getProductListRemote();

  if (!Array.isArray(data)) {
    throw new TypeError("Response daftar produk dari API tidak valid.");
  }

  const models = data.map((item) => ProductModel.fromResponse(item));
  const ids = models.map((model) => model.getId());

  if (new Set(ids).size !== ids.length) {
    throw new TypeError("ID produk dari API harus unik.");
  }

  return models;
}

export async function getProductById(id) {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new TypeError("ID produk tidak valid.");
  }

  const data = await getProductByIdRemote(numericId);

  return data === null ? null : ProductModel.fromResponse(data);
}

export async function createProduct(values) {
  return ProductModel.fromResponse(await createProductRemote(values));
}

export async function updateProduct({ id, ...values }) {
  return ProductModel.fromResponse(await updateProductRemote({ id, ...values }));
}

export async function deleteProduct(id) {
  await deleteProductRemote(id);
}
