import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import ProductForm from '../components/ProductForm'

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('ProductForm', () => {
  it('submits form data when filled and submitted', async () => {
    const mockSubmit = vi.fn()
    renderWithRouter(<ProductForm onSubmit={mockSubmit} submitLabel="Create" />)

    fireEvent.change(screen.getByLabelText(/Product Title/i), {
      target: { value: 'New Gadget' },
    })
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '49.99' },
    })
    fireEvent.change(screen.getByLabelText(/Category/i), {
      target: { value: 'Gadgets' },
    })
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Amazing new gadget' },
    })

    fireEvent.click(screen.getByRole('button', { name: /create/i }))

    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'New Gadget',
      price: 49.99,
      description: 'Amazing new gadget',
      category: 'Gadgets',
      imageUrl: '',
    })
  })

  it('pre-fills form with initialData', () => {
    const initialData = {
      title: 'Existing Product',
      price: '199.99',
      description: 'Already exists',
      category: 'Audio',
      imageUrl: 'http://example.com/img.jpg',
    }
    renderWithRouter(<ProductForm initialData={initialData} onSubmit={vi.fn()} />)

    expect(screen.getByLabelText(/Product Title/i).value).toBe('Existing Product')
    expect(screen.getByLabelText(/Price/i).value).toBe('199.99')
    expect(screen.getByLabelText(/Category/i).value).toBe('Audio')
    expect(screen.getByLabelText(/Description/i).value).toBe('Already exists')
    expect(screen.getByLabelText(/Image URL/i).value).toBe('http://example.com/img.jpg')
  })
})