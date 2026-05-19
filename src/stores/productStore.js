import { create } from 'zustand'

const API_URL = 'https://fakestoreapi.com/products'

const useProductStore = create((set, get) => ({
  //State  
  products: [],
  loading: false,
  error: null,

  // Helper to map API response to internal model
  mapProductFromApi: (apiProduct) => ({
    ...apiProduct,
    imageUrl: apiProduct.image, // Map 'image' from API to 'imageUrl' for internal use
  }),

  // Helper to map internal model to API request body
  mapProductToApi: (internalProduct) => {
    const { imageUrl, ...rest } = internalProduct;
    return {
      ...rest,
      image: imageUrl, // Map 'imageUrl' to 'image' for API request
    };
  },

  // READ: Fetch all products when the app loads
  fetchProducts: async () => {
    set({ loading: true })
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ products: data.map(get().mapProductFromApi), loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // CREATE: POST(add) new product and append to local state
  addProduct: async (product) => {
   try {
    const productToSend = get().mapProductToApi(product);
    const response = await fetch(API_URL, { // Fake Store API expects POST to /products
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToSend)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newProduct = await response.json(); // Fake Store API returns the new product with an ID
    set((state) => ({ products: [...state.products, get().mapProductFromApi(newProduct)] }));
   } catch (error) {
    set({ error: error.message });
   }
  },

  // UPDATE: PATCH(edit) only the fields that changed
  updateProduct: async (id, updatedProduct) => {
    try {
        const productToSend = get().mapProductToApi(updatedProduct);
        const response = await fetch(`${API_URL}/${id}`, { // Fake Store API uses PUT for full update
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productToSend)
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updated = await response.json(); // Fake Store API returns the updated product
        set((state) => ({
            products: state.products.map(p => p.id === id ? get().mapProductFromApi(updated) : p)
        }));
    } catch (error) {
        set({ error: error.message });
    }
  },

  // DELETE: Remove from server and filter from local array
  deleteProduct: async (id) => {
    console.log('deleting product with id:', id, typeof id)
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' }); // Fake Store API returns the deleted item
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      set((state) => ({
        products: state.products.filter(p => p.id !== id)
      }));
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useProductStore;