import React, { useState } from 'react';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <img src="/logo500.png" alt="Lingovera Logo" className="logo" />
            <span className="brand-name">Lingovera</span>
          </div>
          
          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <a href="#bireysel" className="nav-item active">Bireysel</a>
            <a href="#kurumsal" className="nav-item">Kurumsal</a>
            <a href="#cocuklar" className="nav-item">Çocuklar</a>
            <a href="#fiyatlar" className="nav-item">Fiyatlar</a>
          </div>
          
          <div className={`navbar-end ${isMenuOpen ? 'active' : ''}`}>
            <div className="language-selector">
              <img src="https://flagcdn.com/w20/tr.png" alt="Türkçe" width="20" />
              <span>Türkçe</span>
              <span className="dropdown-arrow">▼</span>
            </div>
            <button className="btn btn-outline" onClick={openLoginModal}>Giriş <span>→</span></button>
            <button className="btn btn-primary" onClick={openRegisterModal}>Başla <span>→</span></button>
          </div>
        </div>
      </nav>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </>
  );
};

export default Navbar;