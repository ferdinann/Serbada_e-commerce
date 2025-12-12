import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, MessageCircle, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../constants';
import { CheckoutDetails } from '../types';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, totalCartPrice, clearCart } = useStore();
  
  const [details, setDetails] = useState<CheckoutDetails>({
    name: '',
    address: '',
    phone: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    // Construct Message
    let message = `Halo, saya ingin memesan:\n\n`;
    cart.forEach(item => {
      message += `- ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n*Total: ${formatPrice(totalCartPrice)}*\n\n`;
    message += `Data Pemesan:\n`;
    message += `Nama: ${details.name}\n`;
    message += `No HP: ${details.phone}\n`;
    message += `Alamat: ${details.address}\n`;

    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Clear cart (optional: depends on business logic, keeping it usually better until confirmed)
    // clearCart(); 
    
    // Open WhatsApp
    window.open(waLink, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center max-w-md w-full">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-10 w-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-500 mb-8">Kamu belum menambahkan barang apapun ke keranjang.</p>
          <Link 
            to="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 w-full transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Cart Items List */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {cart.map(item => (
                <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md border border-gray-200"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-blue-600 font-medium">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Hapus"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
            
            <div className="flex justify-between mb-4 pb-4 border-b border-gray-100">
              <span className="text-gray-600">Total Harga</span>
              <span className="text-2xl font-bold text-blue-600">{formatPrice(totalCartPrice)}</span>
            </div>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={details.name}
                  onChange={e => setDetails({...details, name: e.target.value})}
                  placeholder="Budi Santoso"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP</label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={details.phone}
                  onChange={e => setDetails({...details, phone: e.target.value})}
                  placeholder="08123456789"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  value={details.address}
                  onChange={e => setDetails({...details, address: e.target.value})}
                  placeholder="Jl. Merdeka No. 45, Jakarta..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-6 shadow-md hover:shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Beli via WhatsApp
              </button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                Anda akan diarahkan ke WhatsApp admin 083166896713 untuk menyelesaikan pembayaran.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;