import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import ProductCard from '../components/ProductCard'
import useProductStore from '../stores/productStore'

vi.mock('../stores/productStore')

const mockProduct = {
  id: 1,
  title: 'Test Headphones',
  price: 99.99,
  description: 'Great sound',
  category: 'Electronics',
  imageUrl: '',
}

// Helper to render with router
const renderWithRouter = (ui) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ProductCard', () => {
  it('renders product title', () => {
    useProductStore.mockImplementation((selector) => selector({ deleteProduct: vi.fn() }))
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Headphones')).toBeInTheDocument()
  })

  it('renders product price', () => {
    useProductStore.mockImplementation((selector) => selector({ deleteProduct: vi.fn() }))
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('renders product description', () => {
    useProductStore.mockImplementation((selector) => selector({ deleteProduct: vi.fn() }))
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Great sound')).toBeInTheDocument()
  })

  it('shows delete confirmation dialog when clicking delete button', async () => {
    const mockDelete = vi.fn()
    // Correctly mock Zustand selector to return the function, not the object
    useProductStore.mockImplementation((selector) => selector({ deleteProduct: mockDelete }))

    renderWithRouter(<ProductCard product={mockProduct} />)

    // Open the dialog
    const deleteButton = screen.getByRole('button', { name: /^delete$/i })
    fireEvent.click(deleteButton)

    // Use findBy to wait for the Portal to render and get the dialog content
    const dialog = await screen.findByRole('alertdialog')
    expect(within(dialog).getByText(/are you sure/i)).toBeInTheDocument()

    // Query inside the dialog to avoid finding the trigger button in the background
    const confirmButton = within(dialog).getByRole('button', { name: /^delete$/i })
    fireEvent.click(confirmButton)

    expect(mockDelete).toHaveBeenCalledWith(1)
  })

  it('renders edit link with correct URL', () => {
    useProductStore.mockImplementation((selector) => selector({ deleteProduct: vi.fn() }))
    renderWithRouter(<ProductCard product={mockProduct} />)
    const editLink = screen.getByRole('link', { name: /edit/i })
    expect(editLink).toHaveAttribute('href', '/products/1/edit')
  })
})