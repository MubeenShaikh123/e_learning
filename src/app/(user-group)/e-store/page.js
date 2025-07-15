"use client"

// pages/store/index.js
import { useState, useEffect } from 'react';
// import { useCart } from '../../hooks/useCart';
const useCart =()=>{};
import CategorySection from '../../../components/E-commerce/CategorySection';
import { Search, Filter, ShoppingBag, Star, TrendingUp } from 'lucide-react';

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const userId = 'user123'; // Replace with actual user ID from your auth system
//   const { addToCart } = useCart(userId);
  const addToCart  = ()=>{};

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'pens', name: 'Pens & Pencils', icon: '✏️' },
    { id: 'notebooks', name: 'Notebooks', icon: '📓' },
    { id: 'art-supplies', name: 'Art Supplies', icon: '🎨' },
    { id: 'office-supplies', name: 'Office Supplies', icon: '📎' },
    { id: 'bags', name: 'Bags', icon: '🎒' },
    { id: 'electronics', name: 'Electronics', icon: '💻' }
  ];

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
        limit: '50'
      });
      
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await addToCart(productId, quantity);
      // Show success message
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const groupedProducts = categories.reduce((acc, category) => {
    if (category.id === 'all') return acc;
    acc[category.id] = products.filter(p => p.category === category.id);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Stationary Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Everything you need for work, study, and creativity
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5" />
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
              <ShoppingBag className="w-5 h-5" />
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.slice(1).map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-2xl text-center transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 shadow-sm'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="font-medium text-sm">{category.name}</div>
            </button>
          ))}
        </div>

        {/* Products Display */}
        {selectedCategory === 'all' ? (
          // Show all categories
          <>
            {Object.entries(groupedProducts).map(([categoryId, categoryProducts]) => {
              const category = categories.find(c => c.id === categoryId);
              if (!category || categoryProducts.length === 0) return null;
              
              return (
                <CategorySection
                  key={categoryId}
                  title={category.name}
                  products={categoryProducts}
                  onAddToCart={handleAddToCart}
                  showMore={true}
                />
              );
            })}
          </>
        ) : (
          // Show selected category
          <CategorySection
            title={categories.find(c => c.id === selectedCategory)?.name || 'Products'}
            products={products}
            onAddToCart={handleAddToCart}
            showMore={false}
          />
        )}
      </div>
    </div>
  );
};

export default StorePage;
