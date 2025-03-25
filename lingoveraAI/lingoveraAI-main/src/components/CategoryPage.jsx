import React, { useState, useEffect } from 'react';
import '../styles/CategoryPage.css';

// Örnek kategori ve alt kategori verisi
const SAMPLE_CATEGORIES = [
  {
    id: 1,
    title: "Alışveriş",
    description: "Alışveriş ile ilgili temel diyaloglar ve kavramlar",
    image: "https://source.unsplash.com/random/800x600?shopping",
    count: 8,
    subcategories: [
      {
        id: "sub-1-1",
        name: "Market Alışverişi",
        description: "Markette alışveriş yaparken kullanabileceğiniz diyaloglar",
        image: "https://source.unsplash.com/random/800x600?grocery",
        count: 5,
        is_locked: false,
        difficulty_level: "Başlangıç"
      },
      {
        id: "sub-1-2",
        name: "Kıyafet Alışverişi",
        description: "Kıyafet mağazasında kullanabileceğiniz diyaloglar",
        image: "https://source.unsplash.com/random/800x600?clothing",
        count: 3,
        is_locked: true,
        difficulty_level: "Orta"
      }
    ]
  },
  {
    id: 2,
    title: "Seyahat",
    description: "Seyahat ederken kullanabileceğiniz diyaloglar",
    image: "https://source.unsplash.com/random/800x600?travel",
    count: 12,
    subcategories: [
      {
        id: "sub-2-1",
        name: "Otel",
        description: "Otel rezervasyonu ve konaklamayla ilgili diyaloglar",
        image: "https://source.unsplash.com/random/800x600?hotel",
        count: 4,
        is_locked: false,
        difficulty_level: "Başlangıç"
      },
      {
        id: "sub-2-2",
        name: "Ulaşım",
        description: "Toplu taşıma, taksi ve yön tarifi ile ilgili diyaloglar",
        image: "https://source.unsplash.com/random/800x600?transport",
        count: 5,
        is_locked: true,
        difficulty_level: "Orta"
      },
      {
        id: "sub-2-3",
        name: "Restoran",
        description: "Restoranlarda yemek siparişi ile ilgili diyaloglar",
        image: "https://source.unsplash.com/random/800x600?restaurant",
        count: 3,
        is_locked: true,
        difficulty_level: "İleri"
      }
    ]
  },
  {
    id: 3,
    title: "İş Hayatı",
    description: "İş ortamında kullanabileceğiniz diyaloglar",
    image: "https://source.unsplash.com/random/800x600?business",
    count: 10,
    subcategories: [
      {
        id: "sub-3-1",
        name: "Toplantı",
        description: "İş toplantılarında kullanabileceğiniz diyaloglar",
        image: "https://source.unsplash.com/random/800x600?meeting",
        count: 4,
        is_locked: false,
        difficulty_level: "Başlangıç"
      },
      {
        id: "sub-3-2",
        name: "Sunum",
        description: "Sunum yaparken kullanabileceğiniz diyaloglar",
        image: "https://source.unsplash.com/random/800x600?presentation",
        count: 3,
        is_locked: true,
        difficulty_level: "Orta"
      },
      {
        id: "sub-3-3",
        name: "Görüşme",
        description: "İş görüşmelerinde kullanabileceğiniz diyaloglar",
        image: "https://source.unsplash.com/random/800x600?interview",
        count: 3,
        is_locked: true,
        difficulty_level: "İleri"
      }
    ]
  }
];

const CategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // İlk kategoriyi otomatik seç
  useEffect(() => {
    if (SAMPLE_CATEGORIES.length > 0 && !selectedCategory) {
      setSelectedCategory(SAMPLE_CATEGORIES[0]);
    }
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = (subcategory) => {
    if (subcategory.is_locked) {
      // Kilitli içerik için bildirim/uyarı gösterme
      alert("Bu içerik şu an kilitli. Önceki konuları tamamladıktan sonra erişebilirsiniz.");
      return;
    }
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className="category-page-container">
      {/* Sol taraftaki kategori listesi */}
      <div className="category-sidebar">
        <h2 className="sidebar-title">Kategoriler</h2>
        <div className="category-list">
          {SAMPLE_CATEGORIES.map((category) => (
            <div 
              key={category.id}
              className={`category-list-item ${selectedCategory?.id === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className="category-list-icon">🔹</div>
              <div className="category-list-text">
                <h3>{category.title}</h3>
                <span className="category-count">{category.count} konu</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ taraftaki alt kategoriler ve içerik */}
      <div className="category-content">
        {selectedCategory ? (
          <>
            <div className="category-header">
              <h1>{selectedCategory.title}</h1>
              <p>{selectedCategory.description}</p>
            </div>

            <div className="subcategory-path-container">
              <div className="subcategory-cards">
                {/* Alt kategorileri zorluk seviyesine göre sıralayalım */}
                {selectedCategory.subcategories
                  .sort((a, b) => {
                    const difficultyOrder = { "Başlangıç": 1, "Orta": 2, "İleri": 3 };
                    return difficultyOrder[a.difficulty_level] - difficultyOrder[b.difficulty_level];
                  })
                  .map((subcategory, index) => (
                  <div
                    key={subcategory.id}
                    className={`subcategory-card ${selectedSubcategory?.id === subcategory.id ? 'active' : ''} ${index === 0 ? '' : 'locked'}`}
                    onClick={() => handleSubcategoryClick({ ...subcategory, is_locked: index !== 0 })}
                  >
                    {index !== 0 && (
                      <div className="lock-overlay">
                        <span className="lock-icon">🔒</span>
                        <div className="lock-message">
                          <p>Önceki aşamayı tamamlayarak bu içeriğin kilidini açın</p>
                          <p style={{ fontSize: '10px', marginTop: '4px', opacity: 0.8 }}>
                            {index === 1 ? 'Başlangıç seviyesini tamamlayın' : 'Orta seviyeyi tamamlayın'}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="completion-indicator">
                      {index === 0 ? (
                        <>🎯 Mevcut Aşama</>
                      ) : (
                        <>🔒 {index + 1}. Aşama</>
                      )}
                    </div>
                    <div className="subcategory-image">
                      <img src={subcategory.image} alt={subcategory.name} />
                    </div>
                    <div className="subcategory-info">
                      <h3>{subcategory.name}</h3>
                      <p>{subcategory.description}</p>
                      <div className="subcategory-footer">
                        <span className="subcategory-count">{subcategory.count} ders</span>
                        <span className={`difficulty-level ${subcategory.difficulty_level.toLowerCase()}`}>
                          {subcategory.difficulty_level}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="no-selection">
            <h2>Lütfen bir kategori seçin</h2>
            <p>İçeriği görüntülemek için soldaki listeden bir kategori seçin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 