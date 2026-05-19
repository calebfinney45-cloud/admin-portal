import { describe, it, expect, vi, beforeEach } from 'vitest'
import { create } from 'zustand'
import useProductStore from '../stores/productStore'

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('productStore', () => {
  beforeEach(() => {
    mockFetch.mockReset()
    // Reset store state between tests
    const store = useProductStore.getState()
    store.products = []
    store.loading = false
    store.error = null
  })

  it('fetchProducts updates products on success', async () => {
    const fakeProducts = [{ id: 1, title: 'Test' }]
    mockFetch.mockResolvedValueOnce({
      json: async () => fakeProducts,
    })

    await useProductStore.getState().fetchProducts()

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:5000/products')
    expect(useProductStore.getState().products).toEqual(fakeProducts)
    expect(useProductStore.getState().loading).toBe(false)
  })

  it('fetchProducts sets error on failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    await useProductStore.getState().fetchProducts()

    expect(useProductStore.getState().error).toBe('Network error')
    expect(useProductStore.getState().loading).toBe(false)
  })

  it('addProduct appends new product', async () => {
    const newProduct = { title: 'New', price: 10 }
    const returnedProduct = { id: 99, ...newProduct }
    mockFetch.mockResolvedValueOnce({
      json: async () => returnedProduct,
    })

    await useProductStore.getState().addProduct(newProduct)

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
    expect(useProductStore.getState().products).toContainEqual(returnedProduct)
  })

  it('deleteProduct removes product', async () => {
    // Set initial state
    useProductStore.setState({ products: [{ id: 1, title: 'To Delete' }] })
    mockFetch.mockResolvedValueOnce({ ok: true })

    await useProductStore.getState().deleteProduct(1)

    expect(mockFetch).toHaveBeenCalledWith('http://localhost:5000/products/1', {
      method: 'DELETE',
    })
    expect(useProductStore.getState().products).toHaveLength(0)
  })
})