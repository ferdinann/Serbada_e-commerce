import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-gray-200 py-6 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Serbada. MVP Demo.</p>
              <p className="mt-2">Pembayaran via WhatsApp Resmi: 083166896713</p>
            </div>
          </footer>
        </div>
      </Router>
    </StoreProvider>
  );
};

export default App;