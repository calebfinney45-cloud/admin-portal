import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import useProductStore from '../stores/productStore';
import PropTypes from 'prop-types';

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    category: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default function ProductCard({ product }) {
  const deleteProduct = useProductStore((state) => state.deleteProduct);

  const handleDelete = async () => {
    await deleteProduct(product.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="bg-linear-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-5xl opacity-50">🖼️</span>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-gray-800 mb-1 truncate">
          {product.title}
        </h3>
        <p className="text-2xl font-bold text-indigo-600 mb-4">
          ${product.price}
        </p>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <Link to={`/products/${product.id}/edit`} className="flex-1">
            <Button variant="outline" className="w-full gap-2">
              <Edit className="w-4 h-4" />
              Edit
            </Button>
          </Link>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex-1 gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="font-heading">Delete Product?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{product.title}"? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
