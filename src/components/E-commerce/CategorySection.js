// components/ecommerce/CategorySection.js
import { useState } from 'react';
import ProductCard from './ProductCard';
import { ChevronRight, Package } from 'lucide-react';

const CategorySection = ({ title, products, onAddToCart, showMore = false }) => {
  const [showAll, setShowAll] = useState(false);
  const displayProducts = showAll ? products : products.slice(0, 8);

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        {showMore && products.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
          >
            {showAll ? 'Show Less' : 'View All'}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No products found in this category</p>
        </div>
      )}
    </section>
  );
};

export default CategorySection;