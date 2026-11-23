// Vite proxies /api to the Express backend during development and preview.
const baseUrl = (import.meta.env?.VITE_API_BASE_URL ?? "/api").replace(
  /\/+$/,
  ""
);

async function request(path, options) {
  try {
    return await fetch(`${baseUrl}${path}`, options);
  } catch {
    throw new Error(
      "Tidak dapat terhubung ke server. Pastikan backend berjalan di port 3001."
    );
  }
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function failure(response, fallback) {
  const body = await readJson(response);
  const detail =
    body && typeof body.message === "string"
      ? body.message
      : `HTTP ${response.status}`;
  return new Error(`${fallback}: ${detail}`);
}

export async function getProductListRemote() {
  const response = await request("/products", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw await failure(response, "Gagal memuat produk");
  }

  return readJson(response);
}

export async function getProductByIdRemote(id) {
  const response = await request(`/products/${id}`, {
    headers: { Accept: "application/json" },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw await failure(response, "Gagal memuat produk");
  }

  return readJson(response);
}

export async function createProductRemote({ name, price }) {
  const response = await request("/products", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, price }),
  });

  if (!response.ok) {
    throw await failure(response, "Gagal menambahkan produk");
  }

  return readJson(response);
}

export async function updateProductRemote({ id, name, price }) {
  const response = await request("/products", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, price }),
  });

  if (!response.ok) {
    throw await failure(response, "Gagal memperbarui produk");
  }

  return readJson(response);
}

export async function deleteProductRemote(id) {
  const response = await request(`/products/${id}`, {
    method: "DELETE",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw await failure(response, "Gagal menghapus produk");
  }
}
