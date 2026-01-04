const API_URL = "http://localhost:5000/api/products";

// Fetch all approved products
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}?status=approved`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

// Fetch product by ID (for details page)
export const fetchProductById = async (id: string) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

// Fetch products by category (only approved)
export const fetchProductsByCategory = async (category: string) => {
  const res = await fetch(`${API_URL}/category/${category}?status=approved`);
  if (!res.ok) throw new Error("Failed to fetch category products");
  return res.json();
};

// Fetch new arrivals (only approved)
export const fetchNewArrivals = async () => {
  const res = await fetch(`${API_URL}/new?status=approved`);
  if (!res.ok) throw new Error("Failed to fetch new arrivals");
  return res.json();
};

// Fetch trending products (only approved)
export const fetchTrendingProducts = async () => {
  const res = await fetch(`${API_URL}/trending?status=approved`);
  if (!res.ok) throw new Error("Failed to fetch trending products");
  return res.json();
};
