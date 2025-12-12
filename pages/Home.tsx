import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import { Search, X, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

const Home: React.FC = () => {
  const { products, addToCart } = useStore();
  
  // Search States
  const [inputValue, setInputValue] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal States
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [cartProduct, setCartProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(products.map(p => p.category))];
    return cats;
  }, [products]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(activeSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setActiveSearch(inputValue);
      setInputValue(''); // Clear input after search
    }
  };

  const clearSearch = () => {
    setActiveSearch('');
    setInputValue('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  // Cart Popup Handler
  const openCartPopup = (product: Product) => {
    setCartProduct(product);
    setQty(1);
  };

  const confirmAddToCart = () => {
    if (cartProduct) {
      addToCart(cartProduct, qty);
      setCartProduct(null);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Serbada</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Toko Serba Ada. Cari, Pilih, Bayar lewat WhatsApp.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          
          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Ketik lalu tekan Enter..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        {activeSearch && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-gray-600">Hasil pencarian untuk: <strong>"{activeSearch}"</strong></span>
            <button 
              onClick={clearSearch} 
              className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
            >
              <X className="h-4 w-4" /> Hapus Filter
            </button>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewDetail={setDetailProduct}
                onAddToCartRequest={openCartPopup}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">Tidak ada produk yang ditemukan.</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative animate-fade-in">
            <button 
              onClick={() => setDetailProduct(null)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-10"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative bg-gray-100">
                 <img 
                  src={detailProduct.image} 
                  alt={detailProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col">
                <span className="text-blue-600 font-semibold text-sm mb-2">{detailProduct.category}</span>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{detailProduct.name}</h2>
                <div className="text-3xl font-bold text-blue-600 mb-6">{formatPrice(detailProduct.price)}</div>
                
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {detailProduct.description}
                </p>
                
                <div className="mt-auto">
                  <button
                    onClick={() => {
                      setDetailProduct(null);
                      openCartPopup(detailProduct);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Beli Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add To Cart Quantity Modal */}
      {cartProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Mau beli berapa?</h3>
            <p className="text-gray-600 mb-6 text-sm">
              Masukkan jumlah untuk <strong>{cartProduct.name}</strong>
            </p>
            
            <div className="flex items-center justify-center gap-6 mb-8">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-700"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-2xl font-bold w-12 text-center">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-700"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setCartProduct(null)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
              >
                Batal
              </button>
              <button 
                onClick={confirmAddToCart}
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md"
              >
                Masukkan Keranjang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;