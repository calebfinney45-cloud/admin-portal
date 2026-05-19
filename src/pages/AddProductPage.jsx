import ProductForm from '../components/ProductForm';
import useProductStore from '../stores/productStore';

function AddProductPage() {
  const addProduct = useProductStore((state) => state.addProduct);

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <h1 className="font-heading text-3xl font-bold text-gray-800 mb-6">
        Add New Product
      </h1>
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <ProductForm 
          onSubmit={addProduct} 
          submitLabel="Create Product"
        />
      </div>
    </div>
  );
}

export default AddProductPage;