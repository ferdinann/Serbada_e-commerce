import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Store, User, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const Navbar: React.FC = () => {
  const { cart, user, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={closeMenu}>
              <Store className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">Serbada</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'text-blue-600' : ''}`}
            >
              Beranda
            </Link>
            
            <Link 
              to="/cart" 
              className="relative text-gray-700 hover:text-blue-600 p-2"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                 <Link 
                  to="/admin" 
                  className={`text-gray-700 hover:text-blue-600 text-sm font-medium ${location.pathname === '/admin' ? 'text-blue-600' : ''}`}
                >
                  Dashboard Penjual
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center gap-1 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  <LogOut className="h-4 w-4" /> Keluar
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-blue-600 flex items-center gap-1 text-sm font-medium"
              >
                <User className="h-5 w-5" /> Login Penjual
              </Link>
            )}
          </div>

          {/* Mobile button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 p-2 mr-2" onClick={closeMenu}>
              <ShoppingCart className="h-6 w-6" />
               {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              onClick={closeMenu}
            >
              Beranda
            </Link>
            {user ? (
              <>
                <Link 
                  to="/admin" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  Dashboard Penjual
                </Link>
                <button 
                  onClick={() => { logout(); closeMenu(); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Login Penjual
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;