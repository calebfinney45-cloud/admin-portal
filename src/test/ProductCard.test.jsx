import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'   // <-- add this
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
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('ProductCard', () => {
  it('renders product title and price', () => {
    useProductStore.mockReturnValue({ deleteProduct: vi.fn() })
    renderWithRouter(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Headphones')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })

  it('shows delete confirmation dialog when clicking delete button', () => {
    const mockDelete = vi.fn()
    useProductStore.mockReturnValue({ deleteProduct: mockDelete })

    renderWithRouter(<ProductCard product={mockProduct} />)

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    // Check dialog appears (using testid or text)
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument()
    expect(screen.getByText(/Test Headphones/i)).toBeInTheDocument()

    // Click the confirm button – note: AlertDialogAction text is "Delete"
    const confirmButton = screen.getByRole('button', { name: /delete/i, hidden: true })
    fireEvent.click(confirmButton)

    expect(mockDelete).toHaveBeenCalledWith(1)
  })

  it('renders edit link with correct URL', () => {
    useProductStore.mockReturnValue({ deleteProduct: vi.fn() })
    renderWithRouter(<ProductCard product={mockProduct} />)
    const editLink = screen.getByRole('link', { name: /edit/i })
    expect(editLink).toHaveAttribute('href', '/products/1/edit')
  })
})