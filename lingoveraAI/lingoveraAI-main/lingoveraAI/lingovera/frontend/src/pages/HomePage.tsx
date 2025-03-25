import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import ulkuImage from '../assets/images/ulku.png';
import logoImage from '../assets/images/logo.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeaturesSection from '../components/FeaturesSection';
import TeachersSection from '../components/TeachersSection';
import PricingSection from '../components/PricingSection';
import { FaUserFriends, FaPlane, FaCoffee, FaShoppingBasket } from 'react-icons/fa';
import { DarkModeContext } from '../App';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  const handleGetStarted = () => {
    navigate('/categories');
  };

  return (
    <div className={`home-page ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <nav className="nav">
        </nav>
      </header>
      
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="title">Dil öğrenmeyi <span className="gradient-text">Yeniden Keşfedin</span></h1>
            <p className="subtitle">
              Yapay zeka destekli dil öğrenme platformumuzla pratik yaparak 
              özgüvenle iletişim kurun.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-large">Hemen Başlayın <span>→</span></button>
              <button className="btn btn-outline btn-large">Daha Fazla Bilgi <span>→</span></button>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-container">
              <img src={ulkuImage} alt="Dil Öğrenme" className="floating-image" />
              <img src={logoImage} alt="Lingovera Logo" className="corner-logo" />
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f9f5ff" fillOpacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,154.7C672,128,768,96,864,90.7C960,85,1056,107,1152,112C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* AI Teachers Section */}
      <TeachersSection />

      {/* Example Scenarios Section */}
      <section className="scenarios-section">
        <div className="container">
          <h2 className="section-title">Örnek Senaryolarımız</h2>
          <p className="section-subtitle">Yapay zeka öğretmenlerimizle gerçek hayat durumlarında pratik yapın</p>
          
          <div className="scenarios-grid">
            <div className="scenario-card">
              <div className="scenario-image">
                <img src="https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images//dating.png" alt="Biriyle Tanışırken" className="scenario-img" />
              </div>
              <h3 className="scenario-title">Biriyle Tanışırken</h3>
              <p className="scenario-description">Yeni insanlarla tanışma heyecanını yaşayın! Kendinizi tanıtma, sohbeti başlatma ve sürdürebilme becerilerinizi geliştirin. Artık sosyal ortamlarda özgüvenle parlayacaksınız! 😊👍</p>
            </div>

            <div className="scenario-card">
              <div className="scenario-image">
                <img src="https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images//travel.png" alt="Seyahat Ederken" className="scenario-img" />
              </div>
              <h3 className="scenario-title">Seyahat Ederken</h3>
              <p className="scenario-description">Dünyayı keşfetmeye hazır mısınız? Havaalanlarında, otellerde ve turistik yerlerde akıcı iletişim kurarak seyahat deneyiminizi unutulmaz bir maceraya dönüştürün! Bavulunuzu hazırlayın, yeni kelimeler sizi bekliyor! ✈️🗺️</p>
            </div>

            <div className="scenario-card">
              <div className="scenario-image">
                <img src="https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images//cafe.png" alt="Kafede Otururken" className="scenario-img" />
              </div>
              <h3 className="scenario-title">Kafede Otururken</h3>
              <p className="scenario-description">Kahve kokusu eşliğinde dil öğrenin! Kafelerde sipariş verme, sohbet etme ve sosyalleşme becerilerinizi geliştirin. Favori içeceğinizi yabancı dilde sipariş etmenin keyfini çıkarın ve yeni arkadaşlıklar kurun! ☕️👫</p>
            </div>

            <div className="scenario-card">
              <div className="scenario-image">
                <img src="https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images//greengrocer.png" alt="Alışveriş Yaparken" className="scenario-img" />
              </div>
              <h3 className="scenario-title">Alışveriş Yaparken</h3>
              <p className="scenario-description">Alışveriş yapmak hiç bu kadar eğlenceli olmamıştı! Marketlerde, manavlarda ve mağazalarda pazarlık yapma, ürün sorma ve ödeme yapma becerilerinizi geliştirin. Günlük hayatınızda hemen kullanabileceğiniz pratik ifadeleri öğrenin! 🛍️👍</p>
            </div>
            
            <div className="scenario-card">
              <div className="scenario-image">
                <img src="https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images//mars.png" alt="Mars'ta Uzaylıyla Sohbet" className="scenario-img" />
              </div>
              <h3 className="scenario-title">Mars'ta Uzaylıyla Sohbet</h3>
              <p className="scenario-description">Galaksiler arası iletişime hazır olun! Mars'ta bir uzaylıyla karşılaştığınızda nasıl iletişim kuracağınızı öğrenin. Yaratıcı dil becerileriyle sınırlarınızı zorlayın ve evrenin en ilginç sohbetine katılın! 🚀👽</p>
            </div>
            
            <div className="scenario-card">
              <div className="scenario-image">
                <img src="https://yazlirpnjlkpxkkpedse.supabase.co/storage/v1/object/public/images//tasdevri.png" alt="Taş Devrinde Sohbet" className="scenario-img" />
              </div>
              <h3 className="scenario-title">Taş Devrinde Sohbet</h3>
              <p className="scenario-description">Zamanda yolculuk yapın! Taş devrinde ilkel bir insanla iletişim kurmanın zorluğunu ve eğlencesini yaşayın. Basit kelimeler ve beden diliyle kendinizi ifade etmeyi öğrenerek dil becerilerinizi temelden geliştirin! 🏰👥</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-cards">
            <div className="mission-box">
              <div className="mission-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h2 className="section-title">Misyonumuz</h2>
              <p>
                Yapay zeka destekli simülasyon ortamımızla, dil öğrenenlerin gerçek dünya senaryolarında 
                pratik yaparak özgüvenle iletişim kurabilmelerini sağlamak ve dil bariyerlerini aşmalarına 
                yardımcı olmak. Dil öğrenmeyi erişilebilir, eğlenceli ve etkili hale getirmek.
              </p>
            </div>
            
            <div className="vision-box">
              <div className="vision-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h2 className="section-title">Vizyonumuz</h2>
              <ul className="vision-list">
                <li>Dil öğrenmeyi optimize etmek için yapay zeka teknolojisini kullanmak</li>
                <li>Gerçek hayat senaryolarında pratik yaparak kullanıcıların özgüvenini artırmak</li>
                <li>Geleneksel dil öğrenme yöntemlerinin sınırlamalarını aşan yenilikçi bir platform olmak</li>
                <li>Dil öğrenme teknolojisinde öncü ve standart belirleyici olmak</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Year Goal Section */}
      <section className="goal-section">
        <div className="container">
          <div className="goal-content">
            <div className="goal-text">
              <h2 className="section-title">Ülkümüz</h2>
              <p>
                Önümüzdeki 5 yıl içinde, en az 1.000.000 kişinin özgüvenle ve keyifle iletişim 
                kurmasını sağlayacak; dil bariyerlerini ortadan kaldırıp kültürleri birbirine 
                yaklaştıran, herkese eşit öğrenme fırsatları sunan kapsayıcı bir topluluk inşa etmek.
              </p>
              <div className="goal-stats">
                <div className="stat-item">
                  <div className="stat-number">1M+</div>
                  <div className="stat-label">Hedef Kullanıcı</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">Desteklenen Dil</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">AI Öğretmen</div>
                </div>
              </div>
            </div>
            <div className="goal-image">
              <img src={ulkuImage} alt="Hedefimiz" />
              <div className="goal-image-decoration"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">Kullanıcılarımız Ne Diyor?</h2>
          <div className="testimonials-slider">
            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.667 16H5.33366C5.33366 16 5.33366 10.6667 10.667 10.6667V5.33334C5.33366 5.33334 0.000326157 10.6667 0.000326157 16V26.6667H10.667V16H21.3337C21.3337 16 21.3337 10.6667 26.667 10.6667V5.33334C21.3337 5.33334 16.0003 10.6667 16.0003 16V26.6667H26.667V16H21.3337C21.3337 16 21.3337 10.6667 26.667 10.6667V5.33334Z" fill="#BC99FE"/>
                </svg>
              </div>
              <p className="testimonial-text">"Lingovera ile İngilizce öğrenmek çok daha kolay ve eğlenceli hale geldi. Yapay zeka öğretmenlerle pratik yapmak gerçekten özgüvenimi artırdı."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{backgroundImage: 'url(https://randomuser.me/api/portraits/men/32.jpg)', backgroundSize: 'cover'}}></div>
                <div className="author-info">
                  <h4>Ahmet Yılmaz</h4>
                  <p>İngilizce Öğrencisi</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.667 16H5.33366C5.33366 16 5.33366 10.6667 10.667 10.6667V5.33334C5.33366 5.33334 0.000326157 10.6667 0.000326157 16V26.6667H10.667V16H21.3337C21.3337 16 21.3337 10.6667 26.667 10.6667V5.33334C21.3337 5.33334 16.0003 10.6667 16.0003 16V26.6667H26.667V16H21.3337C21.3337 16 21.3337 10.6667 26.667 10.6667V5.33334Z" fill="#BC99FE"/>
                </svg>
              </div>
              <p className="testimonial-text">"Fransızca öğrenmek için birçok uygulama denedim, ancak Lingovera'nın kişiselleştirilmiş öğrenme deneyimi ve AI öğretmenleri sayesinde konuşma pratiği yapabilmek diğerlerinden çok daha etkili oldu."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{backgroundImage: 'url(https://randomuser.me/api/portraits/women/65.jpg)', backgroundSize: 'cover'}}></div>
                <div className="author-info">
                  <h4>Zeynep Kaya</h4>
                  <p>Fransızca Öğrencisi</p>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-quote">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.667 16H5.33366C5.33366 16 5.33366 10.6667 10.667 10.6667V5.33334C5.33366 5.33334 0.000326157 10.6667 0.000326157 16V26.6667H10.667V16H21.3337C21.3337 16 21.3337 10.6667 26.667 10.6667V5.33334C21.3337 5.33334 16.0003 10.6667 16.0003 16V26.6667H26.667V16H21.3337C21.3337 16 21.3337 10.6667 26.667 10.6667V5.33334Z" fill="#BC99FE"/>
                </svg>
              </div>
              <p className="testimonial-text">"İş seyahatlerim için İspanyolca öğrenmem gerekiyordu ve Lingovera'nın esnek programı sayesinde yoğun çalışma tempoma rağmen düzenli pratik yapabildim. Artık toplantılarda kendimi rahatça ifade edebiliyorum."</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{backgroundImage: 'url(https://randomuser.me/api/portraits/men/75.jpg)', backgroundSize: 'cover'}}></div>
                <div className="author-info">
                  <h4>Murat Demir</h4>
                  <p>İş İnsanı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Hemen Dil Öğrenme Yolculuğunuza Başlayın</h2>
            <p>Ücretsiz deneme sürenizle platformumuzu keşfedin.</p>
            <button className="btn btn-primary btn-large">Şimdi Kaydolun <span>→</span></button>
          </div>
          <div className="cta-decoration">
            <div className="cta-circle cta-circle-1"></div>
            <div className="cta-circle cta-circle-2"></div>
            <div className="cta-circle cta-circle-3"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;