import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, Users, TrendingUp } from 'lucide-react';

function LandingPage() {
  return (
    <div className="py-16 md:py-24">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Package className="w-4 h-4" />
          Admin Portal v1.0
        </div>
        <h1 className="font-heading text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Manage Your Products
          <span className="text-indigo-600"> With Ease</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          A simple, powerful admin portal to add, edit, and manage your product inventory.
          Built with modern React practices.
        </p>
        <Link to="/products">
          <Button size="lg" className="gap-2">
            Get Started
            <TrendingUp className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
        <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">
            Full CRUD Operations
          </h3>
          <p className="text-gray-500 text-sm">
            Create, read, update, and delete products with ease
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">
            Admin Focused
          </h3>
          <p className="text-gray-500 text-sm">
            Designed specifically for inventory managers
          </p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2">
            Real-time Search
          </h3>
          <p className="text-gray-500 text-sm">
            Instant product filtering with debounced search
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;