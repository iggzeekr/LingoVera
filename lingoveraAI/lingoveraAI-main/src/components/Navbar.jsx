import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/logo.png" alt="LingoVera Logo" className="logo" />
            <span className="brand-name">LingoVera</span>
          </Link>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          <i className={`fas fa-${isMenuOpen ? 'times' : 'bars'}`}></i>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-item">Ana Sayfa</Link></li>
          <li><Link to="/categories" className="nav-item">Kategoriler</Link></li>
          <li><Link to="/courses" className="nav-item">Kurslar</Link></li>
          <li><Link to="/teachers" className="nav-item">Öğretmenler</Link></li>
          <li><Link to="/about" className="nav-item">Hakkımızda</Link></li>
        </ul>

        <div className={`navbar-end ${isMenuOpen ? 'active' : ''}`}>
          <div className="language-selector">
            <span>TR</span>
            <i className="fas fa-chevron-down dropdown-arrow"></i>
          </div>
          <Link to="/login" className="btn btn-outline">Giriş Yap</Link>
          <Link to="/register" className="btn btn-primary">Üye Ol</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 