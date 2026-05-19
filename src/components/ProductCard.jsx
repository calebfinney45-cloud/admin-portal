
// "This card will show each product. No state yet – just the skeleton."
function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* "If there's no image, show a cute placeholder emoji: Got this suggestion from ai" */}
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.title} className="object-cover" />
        ) : (
          <span className="text-5xl">🖼️</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{product.title}</h3>
        <p className="text-indigo-600 text-2xl">${product.price}</p>
        {/* "Buttons will get real handlers later" */}
        <div className="flex gap-2 mt-4">
          <button className="border rounded px-3 py-1">Edit</button>
          <button className="bg-red-500 text-white rounded px-3 py-1">Delete</button>
        </div>
      </div>
    </div>
  )
}