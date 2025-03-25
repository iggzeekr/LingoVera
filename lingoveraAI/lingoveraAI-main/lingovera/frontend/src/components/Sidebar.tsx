import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaHistory, FaSignOutAlt, FaBook, FaCog } from 'react-icons/fa';
import { DarkModeContext } from '../App';

const Sidebar: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Gerçek uygulamada burada oturum kapatma işlemi yapılır
    localStorage.removeItem('user');
    navigate('/');
  };

  const sidebarStyle = {
    backgroundColor: darkMode ? '#222' : '#f5f5f5',
    color: darkMode ? '#fff' : '#333',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '20px 0'
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: darkMode ? '#fff' : '#333',
    textDecoration: 'none',
    margin: '5px 0',
    borderRadius: '8px',
    transition: 'all 0.3s'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: darkMode ? '#444' : '#e0e0e0',
    fontWeight: 'bold' as const
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '20px'
  };

  const logoutButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 20px',
    color: darkMode ? '#fff' : '#333',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    margin: '5px 0',
    borderRadius: '8px',
    width: '100%',
    textAlign: 'left' as const,
    fontSize: '16px',
    transition: 'all 0.3s'
  };

  return (
    <div style={sidebarStyle}>
      <div style={{ margin: '20px 0', textAlign: 'center' as const }}>
        <img 
          src="/logo500.png" 
          alt="Lingovera Logo" 
          style={{ width: '80px', height: '80px', borderRadius: '50%' }} 
        />
        <h3 style={{ margin: '10px 0' }}>Lingovera</h3>
      </div>

      <div style={{ flex: 1 }}>
        <Link to="/dashboard" style={activeLinkStyle}>
          <FaHome style={iconStyle} />
          Ana Sayfa
        </Link>
        <Link to="/categories" style={linkStyle}>
          <FaBook style={iconStyle} />
          Kategoriler
        </Link>
        <Link to="/profile" style={linkStyle}>
          <FaUser style={iconStyle} />
          Profil
        </Link>
        <Link to="/history" style={linkStyle}>
          <FaHistory style={iconStyle} />
          Geçmiş
        </Link>
        <Link to="/settings" style={linkStyle}>
          <FaCog style={iconStyle} />
          Ayarlar
        </Link>
      </div>

      <button onClick={handleLogout} style={logoutButtonStyle}>
        <FaSignOutAlt style={iconStyle} />
        Çıkış Yap
      </button>
    </div>
  );
};

export default Sidebar; 