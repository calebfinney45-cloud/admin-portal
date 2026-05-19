import { create } from 'zustand';

const API_URL = 'http://localhost:5000/products';

const useProductStore = create((set, get) => ({
  // State
  products: [],
  loading: false,
  error: null,

  // READ - Fetch all products
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      set({ products: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // CREATE - Add new product
  addProduct: async (product) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      const newProduct = await response.json();
      set((state) => ({
        products: [...state.products, newProduct]
      }));
      return newProduct;
    } catch (error) {
      set({ error: error.message });
    }
  },

  // UPDATE - Edit product
  updateProduct: async (id, updatedProduct) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct)
      });
      const updated = await response.json();
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? updated : p
        )
      }));
    } catch (error) {
      set({ error: error.message });
    }
  },

  // DELETE - Remove product
  deleteProduct: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      set((state) => ({
        products: state.products.filter((p) => p.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useProductStore;