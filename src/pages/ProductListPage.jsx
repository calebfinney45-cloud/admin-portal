import useProductStore from '../stores/productStore'
import { useEffect } from 'react'

export default function ProductListPage() {
  const { products, fetchProducts, loading } = useProductStore()

  useEffect(() => {
    fetchProducts() // "Fire once when component mounts"
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}

