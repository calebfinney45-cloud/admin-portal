// "useLocation tells us which page we're on – perfect for active styles."
import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';

export default function Navbar() {
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Package className="w-6 h-6 text-indigo-600" />
            <span className="hero-logo font-display text-xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              ProductFlow
            </span>
          </Link>
          
          {/* Navigation */}
          <div className="flex gap-6">
            <Link
              to="/products"
              className={`font-medium transition-colors ${
                isActive('/products')
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Products
            </Link>
            <Link
              to="/products/new"
              className={`font-medium transition-colors ${
                isActive('/products/new')
                  ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}