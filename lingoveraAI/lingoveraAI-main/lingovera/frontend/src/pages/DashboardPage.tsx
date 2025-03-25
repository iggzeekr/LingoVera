import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { DarkModeContext } from '../App';

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  image: string;
}

const DashboardPage: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [currentScenario, setCurrentScenario] = useState('Bir restoranda yemek siparişi veriyorsunuz.');

  // Örnek favori öğretmenler
  const favoriteTeachers: Teacher[] = [
    { id: '1', name: 'Lucas', specialization: 'Konuşma', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', name: 'Maria', specialization: 'Dil Bilgisi', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '3', name: 'Marky', specialization: 'Telaffuz', image: 'https://randomuser.me/api/portraits/men/56.jpg' },
  ];

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: darkMode ? '#333' : '#f0f0f0',
    color: darkMode ? '#fff' : '#333'
  };

  const sidebarContainerStyle = {
    width: '250px',
    borderRight: darkMode ? '1px solid #444' : '1px solid #ddd',
  };

  const contentStyle = {
    flex: 1,
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: darkMode ? '#444' : 'white',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
    boxShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)'
  };

  const buttonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold' as const,
    fontSize: '14px'
  };

  const favoriteTeacherCardStyle = {
    backgroundColor: darkMode ? '#444' : 'white',
    borderRadius: '8px',
    padding: '15px',
    width: '180px',
    textAlign: 'center' as const,
    margin: '10px',
    boxShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease'
  };

  const statsCardStyle = {
    backgroundColor: darkMode ? '#444' : 'white',
    borderRadius: '8px',
    padding: '15px',
    width: '220px',
    margin: '10px',
    boxShadow: darkMode ? '0 4px 8px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.1)'
  };

  const handleGoToCategories = () => {
    navigate('/categories');
  };

  const handleStartScenario = () => {
    // Senaryoyu başlattığınızda burada konuşma sayfasına yönlendirme yapabilirsiniz
    navigate('/speak-write/d5036e84-2693-40fd-8ec5-9e7f3efc2bb4');
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarContainerStyle}>
        <Sidebar />
      </div>
      
      <div style={contentStyle}>
        <h1>Hoş Geldiniz!</h1>

        <div style={cardStyle}>
          <h2>AI Destekli Dil Öğrenen</h2>
          <p>{currentScenario}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button style={buttonStyle} onClick={handleStartScenario}>Başla</button>
            <button style={{ ...buttonStyle, backgroundColor: darkMode ? '#555' : '#f0f0f0', color: darkMode ? '#fff' : '#333' }}>Yarış</button>
          </div>
        </div>

        <h2>İstatistiklerim</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={statsCardStyle}>
            <h3>Kelime Yanılması</h3>
            <p>385 kelime öğrenildi</p>
            <div style={{ height: '10px', backgroundColor: darkMode ? '#333' : '#eee', borderRadius: '5px' }}>
              <div style={{ width: '65%', height: '100%', backgroundColor: '#3498db', borderRadius: '5px' }}></div>
            </div>
          </div>
          
          <div style={statsCardStyle}>
            <h3>Günlük Aktivite</h3>
            <p>Son 7 günde 5 gün aktif</p>
            <div style={{ height: '10px', backgroundColor: darkMode ? '#333' : '#eee', borderRadius: '5px' }}>
              <div style={{ width: '70%', height: '100%', backgroundColor: '#2ecc71', borderRadius: '5px' }}></div>
            </div>
          </div>
        </div>

        <h2>Favori Öğretmenler</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {favoriteTeachers.map(teacher => (
            <div key={teacher.id} style={favoriteTeacherCardStyle}>
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                style={{ width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 10px' }} 
              />
              <h3 style={{ margin: '5px 0' }}>{teacher.name}</h3>
              <p style={{ margin: '5px 0', fontSize: '14px' }}>{teacher.specialization}</p>
            </div>
          ))}
        </div>

        <div style={cardStyle}>
          <h2>Ders Saatine Kadar Kalan Süre</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p>Maria ile Konuşma Dersi</p>
              <p>Bugün 17:30</p>
            </div>
            <div>
              <p>3 saat 22 dakika kaldı</p>
            </div>
          </div>
        </div>

        <div style={{ margin: '30px 0', textAlign: 'center' }}>
          <button 
            style={{ ...buttonStyle, padding: '12px 25px', fontSize: '16px' }} 
            onClick={handleGoToCategories}
          >
            Tüm Kategorileri Göster
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 