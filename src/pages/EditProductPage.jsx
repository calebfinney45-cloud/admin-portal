import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import useProductStore from '../stores/productStore';

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, fetchProducts, updateProduct, loading } = useProductStore();
  const [product, setProduct] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (products.length === 0 && !hasFetched) {
        await fetchProducts();
        setHasFetched(true);
        return;
      }

      // Try to find the product
      const productId = Number.parseInt(id);
      const found = products.find(p => p.id === productId);
      
      if (found) {
        setProduct(found);
      } else if (hasFetched || products.length > 0) {
        // Product truly not found after checking existing or newly fetched products
        navigate('/products');
      }
    };

    loadData();
  }, [products, id, fetchProducts, navigate, hasFetched]);

  // Show loading state
  if (loading || (!product && !hasFetched)) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-t-transparent"></div>
        <p className="mt-2 text-gray-500">Loading product...</p>
      </div>
    );
  }

  // Show if product not found
  if (!product) {
    return null;
  }

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-gray-800 mb-6">
        Edit Product
      </h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm 
          initialData={product} 
          onSubmit={(data) => updateProduct(Number.parseInt(id), data)}
          submitLabel="Update Product"
        />
      </div>
    </div>
  );
}

export default EditProductPage;