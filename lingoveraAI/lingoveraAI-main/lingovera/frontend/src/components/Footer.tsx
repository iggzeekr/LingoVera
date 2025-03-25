import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/logo500.png" alt="Lingovera Logo" className="logo" />
            <span className="brand-name">Lingovera</span>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <a href="#features">Özellikler</a>
              <a href="#pricing">Fiyatlandırma</a>
              <a href="#testimonials">Kullanıcı Yorumları</a>
              <a href="#demo">Demo İste</a>
            </div>
            <div className="footer-column">
              <h4>Şirket</h4>
              <a href="#about">Hakkımızda</a>
              <a href="#careers">Kariyer</a>
              <a href="#contact">İletişim</a>
              <a href="#partners">İş Ortakları</a>
            </div>
            <div className="footer-column">
              <h4>Kaynaklar</h4>
              <a href="#blog">Blog</a>
              <a href="#guides">Rehberler</a>
              <a href="#faq">SSS</a>
              <a href="#webinars">Webinarlar</a>
            </div>
            <div className="footer-column">
              <h4>Yasal</h4>
              <a href="#privacy">Gizlilik Politikası</a>
              <a href="#terms">Kullanım Koşulları</a>
              <a href="#cookies">Çerez Politikası</a>
              <a href="#gdpr">KVKK</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lingovera. Tüm hakları saklıdır.</p>
          <div className="social-links">
            <a href="#" className="social-icon" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" className="social-icon" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="social-icon" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="social-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" className="social-icon" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 