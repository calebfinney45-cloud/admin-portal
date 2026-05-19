import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductCard from '../components/ProductCard';
import useProductStore from '../stores/productStore';
import useDebounce from '../hooks/useDebounce';

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { products, fetchProducts, loading } = useProductStore();

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products based on search term - only happens when debounced value changes 
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-800">
          All Products
        </h1>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full md:w-80"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
          <p className="mt-2 text-gray-500">Loading products...</p>
        </div>
      )}

      {/* Products Grid */}
      {!loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State - No products at all */}
          {products.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">No products yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Click "Add Product" to create your first product
              </p>
            </div>
          )}

          {/* Empty State - Search returned no results */}
          {products.length > 0 && filteredProducts.length === 0 && !loading && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500">No products found matching "{searchTerm}"</p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

