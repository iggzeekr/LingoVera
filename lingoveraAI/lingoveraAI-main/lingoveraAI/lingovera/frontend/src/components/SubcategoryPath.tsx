import React, { useState } from 'react';
import { Subcategory } from '../types';
import { useNavigate } from 'react-router-dom';

interface SubcategoryPathProps {
  subcategories: Subcategory[];
  onSubcategoryClick: (subcategory: Subcategory) => void;
  selectedSubcategory: Subcategory | null;
}

const SubcategoryPath: React.FC<SubcategoryPathProps> = ({
  subcategories,
  onSubcategoryClick,
  selectedSubcategory
}) => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ visible: boolean, message: string }>({ visible: false, message: '' });

  // Uyarı mesajını göster
  const showAlert = (message: string) => {
    setAlert({ visible: true, message });
    // 3 saniye sonra mesajı kaldır
    setTimeout(() => {
      setAlert({ visible: false, message: '' });
    }, 3000);
  };

  // Alt kategorileri özel olarak konumlandır - görseldeki düzene uygun olarak
  const getNodePosition = (index: number) => {
    // Ortalanmış L şeklinde düzen
    if (index === 0) {
      return { top: 50, left: 200, transform: 'translateX(-50%)' };  // 1. kart üstte ortada
    } else if (index === 1) {
      return { top: 250, left: 550, transform: 'translateX(-50%)' };  // 2. kart sağda
    } else if (index === 2) {
      return { top: 450, left: 200, transform: 'translateX(-50%)' };  // 3. kart altta ortada
    } else {
      // Diğer kartlar için benzer düzeni devam ettir
      const isEven = index % 2 === 0;
      return { 
        top: 150 + (index * 150), 
        left: isEven ? 200 : 550,
        transform: 'translateX(-50%)'
      };
    }
  };

  // Bağlantı çizgileri için stil hesaplama
  const getConnectorStyle = (index: number) => {
    if (index < subcategories.length - 1) {
      const current = getNodePosition(index);
      const next = getNodePosition(index + 1);
      
      const path = [];
      
      if (index === 0) { // 1 -> 2 (sağa doğru ve sonra aşağı)
        const startX = (current.left as number);
        const startY = (current.top as number) + 75;
        const midX = 370; // Dikey köşe noktası X
        const midY = startY; // Ortada yatay çizgi için
        const endX = midX; // Dikey çizginin başlangıcı
        const endY = (next.top as number) + 75;
        
        // Yatay çizgi (sol kutudan sağa doğru)
        path.push(`%3Cline x1='${startX + 75}' y1='${startY}' x2='${midX}' y2='${midY}' stroke='%238b5cf6' stroke-width='2' stroke-dasharray='5,5' /%3E`);
        
        // Dikey çizgi (yukarıdan aşağı)
        path.push(`%3Cline x1='${midX}' y1='${midY}' x2='${midX}' y2='${endY}' stroke='%238b5cf6' stroke-width='2' stroke-dasharray='5,5' /%3E`);
        
        // Yatay çizgi (ortadan sağ kutuya)
        path.push(`%3Cline x1='${midX}' y1='${endY}' x2='${(next.left as number) - 75}' y2='${endY}' stroke='%238b5cf6' stroke-width='2' stroke-dasharray='5,5' /%3E`);
        
      } else if (index === 1) { // 2 -> 3 (soldan aşağı ve sola)
        const startX = (current.left as number);
        const startY = (current.top as number) + 75;
        const midX = 370; // Dikey köşe noktası X
        const midY = startY; // Ortada yatay çizgi için
        const endX = midX; // Dikey çizginin başlangıcı
        const endY = (next.top as number) + 75;
        
        // Yatay çizgi (sağ kutudan sola doğru)
        path.push(`%3Cline x1='${startX - 75}' y1='${startY}' x2='${midX}' y2='${midY}' stroke='%238b5cf6' stroke-width='2' stroke-dasharray='5,5' /%3E`);
        
        // Dikey çizgi (yukarıdan aşağı)
        path.push(`%3Cline x1='${midX}' y1='${midY}' x2='${midX}' y2='${endY}' stroke='%238b5cf6' stroke-width='2' stroke-dasharray='5,5' /%3E`);
        
        // Yatay çizgi (ortadan sol kutuya)
        path.push(`%3Cline x1='${midX}' y1='${endY}' x2='${(next.left as number) + 75}' y2='${endY}' stroke='%238b5cf6' stroke-width='2' stroke-dasharray='5,5' /%3E`);
      }
      
      return {
        position: 'absolute' as const,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='1000'%3E${path.join('')}%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
        pointerEvents: 'none' as const
      };
    }
    return {};
  };

  // Kategori için renkleri belirle (görseldeki gibi)
  const getCategoryColor = (index: number) => {
    switch(index) {
      case 0: return { bg: '#0096ff', textBg: '#0096ff' }; // Mavi (Senin İçin)
      case 1: return { bg: '#7373b9', textBg: '#7f8ea3' }; // Mor (Kariyer: Fiiller)
      case 2: return { bg: '#9d3fe7', textBg: '#9d9d9d' }; // Mor (Mülakatta)
      default: return { bg: '#8b5cf6', textBg: '#9d9d9d' }; // Default mor
    }
  };

  const handleStartJourney = () => {
    if (selectedSubcategory) {
      // Seçilen alt kategoriyi localStorage'a kaydet
      localStorage.setItem('selectedSubcategory', JSON.stringify(selectedSubcategory));
      
      // Alt kategori id'si ile yeni oturum başlat
      const sessionId = selectedSubcategory.id || 'temp-session-' + Date.now();
      
      // Ekstra kontrol: seçilen subkategori'yi logla
      console.log("Yolculuğa başlanıyor:", selectedSubcategory);
      
      // Yönlendirme yap
      navigate(`/speak-write/${sessionId}`);
    }
  };

  // Stil tanımlamaları
  const styles = {
    pathContainer: {
      position: 'relative' as const,
      minHeight: '900px',  // Yüksekliği artırdım
      padding: '0 30px 30px 30px',
      maxWidth: '900px',  // Maksimum genişlik ekledim
      width: '100%',
      margin: '0 auto',  // Sayfada ortala
      display: 'flex',
      flexDirection: 'column' as const,
      backgroundColor: 'transparent',
      borderRadius: '20px',
      boxShadow: 'none',
      alignItems: 'center'
    },
    subcategoryNode: {
      position: 'absolute' as const,
      width: '160px',
      textAlign: 'center' as const,
      transition: 'all 0.3s ease'
    },
    cardContainer: {
      width: '150px',
      height: '150px',
      margin: '0 auto 10px',
      position: 'relative' as const
    },
    card: {
      position: 'relative' as const,
      width: '150px',
      height: '150px',
      perspective: '1000px',
      marginBottom: '35px',
      cursor: 'pointer',
      borderRadius: '10px',
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
      overflow: 'visible',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: 'none',
      backgroundColor: 'transparent',
    },
    cardInner: {
      position: 'relative' as const,
      width: '100%',
      height: '100%',
      transition: 'transform 0.6s',
      transformStyle: 'preserve-3d',
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    },
    cardFront: {
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden' as const,
      borderRadius: '10px',
      background: 'transparent',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0',
      color: '#fff',
      textAlign: 'center' as const,
      overflow: 'hidden',
    },
    cardBack: {
      position: 'absolute' as const,
      width: '100%',
      height: '100%',
      backfaceVisibility: 'hidden' as const,
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #5d4eed, #8b5cf6)',
      transform: 'rotateY(180deg)',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      textAlign: 'center' as const,
      color: '#fff',
    },
    nodeImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      display: 'block',
      transform: 'scale(1.1)'
    },
    pathConnector: {
      position: 'absolute' as const,
      zIndex: 0,
      opacity: 1 // Opacity arttırıldı
    },
    lockOverlay: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
      borderRadius: '10px'
    },
    lockIcon: {
      fontSize: '42px',
      color: 'white',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    },
    buttonContainer: {
      display: 'flex' as const,
      justifyContent: 'flex-end' as const,
      width: '100%',
      position: 'absolute' as const,
      bottom: '350px',
      right: '50px',
      left: 'auto',
      zIndex: 999
    },
    startJourneyButton: {
      position: 'relative' as const,
      margin: '0',
      backgroundImage: selectedSubcategory 
        ? 'linear-gradient(135deg, #5d4eed, #bc99fe)' 
        : 'linear-gradient(to right, #9ca3af, #6b7280)',
      color: 'white',
      border: 'none',
      borderRadius: '30px',
      padding: '16px 36px',
      fontSize: '18px',
      fontWeight: 600,
      cursor: selectedSubcategory ? 'pointer' : 'not-allowed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: selectedSubcategory ? '0 8px 25px rgba(93, 78, 237, 0.3)' : 'none',
      transition: 'all 0.3s ease',
      opacity: selectedSubcategory ? 1 : 0.6,
      transform: selectedSubcategory ? 'translateY(0)' : 'translateY(5px)'
    },
    buttonArrow: {
      marginLeft: '12px',
      fontSize: '20px'
    },
    categoryTextBox: {
      position: 'absolute' as const,
      bottom: '-30px',
      left: '0',
      right: '0',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'center' as const,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      color: 'white',
      zIndex: 5
    }
  };

  return (
    <div style={styles.pathContainer} className="subcategory-path-container">
      {/* Sağ üst köşedeki uyarı mesajı */}
      {alert.visible && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: 'rgba(239, 68, 68, 0.95)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
        }}>
          <span style={{ marginRight: '10px', fontSize: '20px' }}>🔒</span>
          <span style={{ fontWeight: 600 }}>{alert.message}</span>
        </div>
      )}
      
      {/* Noktalı çizgi bağlantıları */}
      {subcategories.slice(0, -1).map((_, index) => (
        <div
          key={`connector-${index}`}
          className="path-connector"
          style={{...styles.pathConnector, ...getConnectorStyle(index)}}
        />
      ))}

      {/* Alt kategori düğümleri */}
      {subcategories.map((subcategory, index) => {
        const nodePosition = getNodePosition(index);
        const isLocked = index !== 0; // İlk kutu her zaman açık, diğerleri kilitli
        
        return (
        <div
          key={subcategory.id}
          style={{
            ...styles.subcategoryNode,
              top: nodePosition.top,
              left: nodePosition.left,
              transform: `${nodePosition.transform} ${hoveredCard === subcategory.id ? 'scale(1.05)' : 'scale(1)'}`
            }}
          >
            <div 
              style={styles.cardContainer}
              onMouseEnter={() => setHoveredCard(subcategory.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {
                if (isLocked) {
                  showAlert('Önceki senaryoları tamamlayın');
                } else {
                  onSubcategoryClick(subcategory);
                }
              }}
            >
            <div 
              style={{
                ...styles.card,
                  transform: hoveredCard === subcategory.id ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: hoveredCard === subcategory.id
                    ? '0 10px 20px rgba(139, 92, 246, 0.2)' 
                    : '0 4px 10px rgba(0, 0, 0, 0.08)',
                  border: selectedSubcategory?.id === subcategory.id 
                    ? '2px solid #8b5cf6' 
                    : isLocked ? '2px solid #e0cfff' : 'none',
                  opacity: 1,
                  filter: 'none',
                  backgroundColor: 'transparent'
                }}
              >
                <div
                  style={{
                    ...styles.cardInner,
                    transform: hoveredCard === subcategory.id
                      ? 'rotateY(180deg)' 
                      : 'rotateY(0deg)'
                  } as any}
                >
                  <div style={{
                    ...styles.cardFront,
                    backgroundColor: 'transparent'
                  }}>
                    <img 
                      src={subcategory.image_url || 'https://via.placeholder.com/150'} 
                      alt={subcategory.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1
                      }}
                    />
                    {isLocked && !hoveredCard && (
                      <div style={{
                        ...styles.lockOverlay,
                        background: 'rgba(0, 0, 0, 0.2)',
                        backdropFilter: 'none',
                        border: '2px solid rgba(255, 255, 255, 0.25)'
                      }}>
                        <div style={{
                          ...styles.lockIcon,
                          animation: 'pulse 1.5s infinite',
                          fontSize: '48px',
                          textShadow: '0 2px 10px rgba(255, 255, 255, 0.7)',
                          color: '#ffd700'
                        }}>🔒</div>
                      </div>
                    )}
                  </div>
                  <div style={{
                    ...styles.cardBack,
                    background: 'linear-gradient(135deg, #5840d5, #9168f5)',
                    boxShadow: '0 10px 30px rgba(93, 64, 213, 0.3)',
                    padding: '15px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center'
                  }}>
                    <h3 style={{
                      width: '100%',
                      margin: '0 0 10px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: 'white',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
                      letterSpacing: '0.5px',
                      textAlign: 'center'
                    }}>{subcategory.name}</h3>
                    <p style={{
                      width: '100%',
                      margin: '0',
                      fontSize: '13px',
                      color: 'rgba(255, 255, 255, 0.95)',
                      lineHeight: 1.4,
                      fontWeight: 500,
                      textAlign: 'center'
                    }}>{subcategory.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Butonu her zaman göster, sadece seçim durumuna göre stilini değiştir */}
      <div style={styles.buttonContainer}>
      <button 
          style={{
            ...styles.startJourneyButton,
            padding: '14px 40px',
            fontSize: '17px',
            boxShadow: selectedSubcategory ? '0 10px 25px rgba(93, 78, 237, 0.4)' : 'none',
            backgroundImage: selectedSubcategory 
              ? 'linear-gradient(135deg, #5d4eed, #bc99fe)' 
              : 'linear-gradient(to right, #9ca3af, #6b7280)',
            cursor: selectedSubcategory ? 'pointer' : 'not-allowed',
            opacity: selectedSubcategory ? 1 : 0.6,
          }}
        onClick={handleStartJourney}
        disabled={!selectedSubcategory}
      >
        Yolculuğa Başla <span style={styles.buttonArrow}>→</span>
      </button>
      </div>
    </div>
  );
};

export default SubcategoryPath; 