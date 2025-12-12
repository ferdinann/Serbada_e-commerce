import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onAddToCartRequest: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetail, onAddToCartRequest }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
      <div 
        className="relative pt-[100%] cursor-pointer overflow-hidden"
        onClick={() => onViewDetail(product)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-600">
          {product.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 
          className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 cursor-pointer hover:text-blue-600"
          onClick={() => onViewDetail(product)}
        >
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-blue-600 font-bold text-lg">{formatPrice(product.price)}</span>
          <button 
            onClick={() => onAddToCartRequest(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors flex items-center justify-center active:scale-90 transform duration-150"
            title="Tambah ke Keranjang"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;