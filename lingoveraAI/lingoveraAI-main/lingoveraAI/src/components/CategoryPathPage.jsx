import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CategoryPathPage.css';

// Kategori verileri (örnek)
const CATEGORIES = [
  {
    id: 1,
    name: "İngilizce",
    icon: "🇬🇧",
    count: 42,
    description: "İngilizce dil eğitimi, gramer ve konuşma becerileri",
    subcategories: [
      { id: 101, name: "Temel İngilizce", icon: "📚", count: 12, position: { top: 50, left: 100 } },
      { id: 102, name: "Orta Seviye", icon: "🔤", count: 15, position: { top: 180, left: 250 } },
      { id: 103, name: "İleri Seviye", icon: "🎓", count: 8, position: { top: 310, left: 100 } },
      { id: 104, name: "İş İngilizcesi", icon: "💼", count: 7, position: { top: 180, right: 150 } }
    ]
  },
  {
    id: 2,
    name: "Almanca",
    icon: "🇩🇪",
    count: 28,
    description: "Almanca dil eğitimi, gramer yapısı ve günlük konuşma",
    subcategories: [
      { id: 201, name: "Temel Almanca", icon: "📕", count: 10, position: { top: 50, left: 100 } },
      { id: 202, name: "Orta Seviye", icon: "📝", count: 8, position: { top: 200, left: 250 } },
      { id: 203, name: "İleri Seviye", icon: "📈", count: 6, position: { top: 350, left: 100 } },
      { id: 204, name: "Teknik Almanca", icon: "⚙️", count: 4, position: { top: 200, right: 150 } }
    ]
  },
  {
    id: 3,
    name: "Fransızca",
    icon: "🇫🇷",
    count: 24,
    description: "Fransızca dil eğitimi, telaffuz ve günlük konuşma",
    subcategories: [
      { id: 301, name: "Temel Fransızca", icon: "🥐", count: 8, position: { top: 50, left: 100 } },
      { id: 302, name: "Orta Seviye", icon: "🗼", count: 9, position: { top: 200, left: 250 } },
      { id: 303, name: "İleri Seviye", icon: "🎭", count: 7, position: { top: 350, left: 100 } }
    ]
  },
  {
    id: 4,
    name: "İspanyolca",
    icon: "🇪🇸",
    count: 20,
    description: "İspanyolca dil eğitimi, günlük konuşma ve kültür",
    subcategories: [
      { id: 401, name: "Temel İspanyolca", icon: "💃", count: 7, position: { top: 50, left: 200 } },
      { id: 402, name: "Orta Seviye", icon: "🌮", count: 8, position: { top: 220, left: 100 } },
      { id: 403, name: "İleri Seviye", icon: "🎸", count: 5, position: { top: 180, right: 100 } }
    ]
  },
  {
    id: 5,
    name: "İtalyanca",
    icon: "🇮🇹",
    count: 18,
    description: "İtalyanca dil eğitimi, konuşma ve kültür",
    subcategories: [
      { id: 501, name: "Temel İtalyanca", icon: "🍕", count: 6, position: { top: 80, left: 150 } },
      { id: 502, name: "Orta Seviye", icon: "🏛️", count: 7, position: { top: 250, left: 80 } },
      { id: 503, name: "İleri Seviye", icon: "🎻", count: 5, position: { top: 150, right: 120 } }
    ]
  },
  {
    id: 6,
    name: "Rusça",
    icon: "🇷🇺",
    count: 15,
    description: "Rusça dil eğitimi ve kültür",
    subcategories: [
      { id: 601, name: "Temel Rusça", icon: "🏰", count: 5, position: { top: 100, left: 120 } },
      { id: 602, name: "Orta Seviye", icon: "❄️", count: 6, position: { top: 250, left: 250 } },
      { id: 603, name: "İleri Seviye", icon: "📜", count: 4, position: { top: 180, right: 130 } }
    ]
  }
];

// Çizgi bağlantıları - her kategori için ayrı bir bağlantı seti
const CONNECTIONS = {
  1: [
    { from: 101, to: 102 },
    { from: 102, to: 103 },
    { from: 102, to: 104 }
  ],
  2: [
    { from: 201, to: 202 },
    { from: 202, to: 203 },
    { from: 202, to: 204 }
  ],
  3: [
    { from: 301, to: 302 },
    { from: 302, to: 303 }
  ],
  4: [
    { from: 401, to: 402 },
    { from: 401, to: 403 }
  ],
  5: [
    { from: 501, to: 502 },
    { from: 501, to: 503 }
  ],
  6: [
    { from: 601, to: 602 },
    { from: 602, to: 603 }
  ]
};

const CategoryPathPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // İlk kategorinin seçilmesi
  useEffect(() => {
    if (CATEGORIES.length > 0 && !selectedCategory) {
      setSelectedCategory(CATEGORIES[0]);
    }
  }, []);

  // Responsive tasarım için pencere genişliğini izleme
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Bağlantı çizgilerinin pozisyonlarını hesaplama
  const calculateConnector = (fromNode, toNode) => {
    if (!selectedCategory) return {};

    const from = selectedCategory.subcategories.find(sc => sc.id === fromNode);
    const to = selectedCategory.subcategories.find(sc => sc.id === toNode);
    
    if (!from || !to) return {};

    // Responsive tasarım için düzeltme
    if (windowWidth <= 768) return {};

    const getNodeCenter = (node) => {
      const left = node.position.left || (windowWidth - 400 - (node.position.right || 0));
      return { 
        x: left + 55, // 110/2
        y: node.position.top + 55
      };
    };

    const fromCenter = getNodeCenter(from);
    const toCenter = getNodeCenter(to);
    
    const dx = toCenter.x - fromCenter.x;
    const dy = toCenter.y - fromCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    return {
      left: fromCenter.x,
      top: fromCenter.y,
      width: distance,
      transform: `rotate(${angle}deg)`,
      transformOrigin: '0 0'
    };
  };

  return (
    <div className="category-path-container">
      {/* Sol taraftaki kategori listesi */}
      <aside className="category-sidebar">
        <h3 className="category-sidebar-title">Kategoriler</h3>
        <ul className="categories-list">
          {CATEGORIES.map(category => (
            <li 
              key={category.id}
              className={`category-list-item ${selectedCategory?.id === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              <span className="category-icon">{category.icon}</span>
              {category.name}
              <span className="category-count">{category.count}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Sağ taraftaki öğrenme yolu */}
      <div className="category-path-content">
        {selectedCategory ? (
          <>
            <div className="path-header">
              <h2 className="path-title">{selectedCategory.name} Öğrenme Yolu</h2>
              <p className="path-description">{selectedCategory.description}</p>
            </div>

            <div className="path-map">
              {/* Bağlantı çizgileri */}
              {CONNECTIONS[selectedCategory.id]?.map(conn => {
                const connStyle = calculateConnector(conn.from, conn.to);
                return (
                  <div 
                    key={`${conn.from}-${conn.to}`}
                    className="path-connector"
                    style={connStyle}
                  />
                );
              })}

              {/* Alt kategori düğümleri */}
              {selectedCategory.subcategories.map(subcat => (
                <div 
                  key={subcat.id}
                  className="subcategory-node"
                  style={{
                    top: subcat.position.top,
                    left: subcat.position.left,
                    right: subcat.position.right
                  }}
                >
                  <div className="node-content">
                    <span className="node-icon">{subcat.icon}</span>
                    <span className="node-text">{subcat.name}</span>
                  </div>
                  <div className="subcategory-title">{subcat.name}</div>
                  <div className="subcategory-count">{subcat.count} Kurs</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3 className="empty-text">Lütfen incelemek istediğiniz bir kategori seçin</h3>
            <Link to="/courses" className="empty-button">
              Tüm Kursları Görüntüle
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPathPage; 