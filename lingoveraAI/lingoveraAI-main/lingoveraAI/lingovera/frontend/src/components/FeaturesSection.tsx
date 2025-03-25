import React from 'react';
import FeatureCard from './FeatureCard';
import { RiBrainLine } from 'react-icons/ri';
import { MdFeedback, Md3DRotation } from 'react-icons/md';
import { FaGraduationCap } from 'react-icons/fa';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: "Yapay Zeka Destekli Öğrenme",
      description: "Kişiselleştirilmiş öğrenme deneyimi için gelişmiş AI teknolojisi",
      icon: <RiBrainLine size={40} className="feature-icon" />
    },
    {
      title: "Gerçek Dünya Simülasyonları",
      description: "Gerçek hayat senaryolarında pratik yapma imkanı",
      icon: <Md3DRotation size={40} className="feature-icon" />
    },
    {
      title: "Anlık Geri Bildirim",
      description: "Konuşma ve yazma becerileriniz için anında düzeltme ve öneriler",
      icon: <MdFeedback size={40} className="feature-icon" />
    },
    {
      title: "Kişiselleştirilmiş Müfredat",
      description: "Öğrenme hızınıza ve hedeflerinize göre uyarlanmış içerik",
      icon: <FaGraduationCap size={40} className="feature-icon" />
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Özelliklerimiz</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 