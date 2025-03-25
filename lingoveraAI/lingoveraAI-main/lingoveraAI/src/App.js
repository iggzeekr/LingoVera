import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategoryPathPage from './components/CategoryPathPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPathPage />} />
          {/* Diğer sayfalarınız */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 