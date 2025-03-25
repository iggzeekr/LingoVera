import React from 'react';
import PricingPlan from './PricingPlan';

const PricingSection: React.FC = () => {
  const basicFeatures = [
    { text: 'Sınırsız konuşma pratiği', included: true },
    { text: 'Temel kelime havuzu', included: true },
    { text: 'Haftalık ilerleme raporu', included: true },
    { text: 'Özel ders desteği', included: false },
  ];

  const standardFeatures = [
    { text: 'Sınırsız konuşma pratiği', included: true },
    { text: 'Genişletilmiş kelime havuzu', included: true },
    { text: 'Günlük ilerleme raporu', included: true },
    { text: 'Ayda 2 özel ders desteği', included: true },
  ];

  const premiumFeatures = [
    { text: 'Sınırsız konuşma pratiği', included: true },
    { text: 'Tam kelime havuzu erişimi', included: true },
    { text: 'Gerçek zamanlı ilerleme takibi', included: true },
    { text: 'Sınırsız özel ders desteği', included: true },
  ];

  return (
    <section className="pricing-section" id="fiyatlar">
      <div className="container">
        <h2 className="section-title">Abonelik Planları</h2>
        <p className="section-subtitle">
          İhtiyaçlarınıza en uygun planı seçin ve dil öğrenme yolculuğunuza başlayın.
        </p>
        
        <div className="pricing-toggle">
          <span className="toggle-option active">Aylık</span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <span className="toggle-option">Yıllık</span>
          <span className="discount-badge">%20 İndirim</span>
        </div>
        
        <div className="pricing-grid">
          <PricingPlan
            title="Temel"
            price="99"
            period="ay"
            description="Dil öğrenmeye yeni başlayanlar için ideal başlangıç planı."
            features={basicFeatures}
            buttonText="Şimdi Başla"
          />
          
          <PricingPlan
            title="Standart"
            price="199"
            period="ay"
            description="Dil becerilerini geliştirmek isteyenler için en popüler seçenek."
            features={standardFeatures}
            isPopular={true}
            buttonText="Şimdi Başla"
          />
          
          <PricingPlan
            title="Premium"
            price="349"
            period="ay"
            description="Profesyonel dil yetkinliği kazanmak isteyenler için tam kapsamlı plan."
            features={premiumFeatures}
            buttonText="Şimdi Başla"
          />
        </div>
        
        <div className="pricing-note">
          <p>Tüm planlar 7 günlük ücretsiz deneme süresi içerir. İstediğiniz zaman iptal edebilirsiniz.</p>
          <p>Kurumsal planlar için <a href="#contact">bizimle iletişime geçin</a>.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 