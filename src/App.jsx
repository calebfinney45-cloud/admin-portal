// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import ProductListPage from './pages/ProductListPage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className='bg-gray-50 min-h-screen'>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/new" element={<AddProductPage />} />
            <Route path="/products/:id/edit" element={<EditProductPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}