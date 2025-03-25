import React from 'react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlanProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  price,
  period,
  description,
  features,
  isPopular = false,
  buttonText
}) => {
  return (
    <div className={`pricing-card ${isPopular ? 'popular' : ''}`}>
      {isPopular && <div className="popular-badge">En Popüler</div>}
      <h3 className="plan-title">{title}</h3>
      <div className="plan-price">
        <span className="currency">₺</span>
        <span className="amount">{price}</span>
        <span className="period">/{period}</span>
      </div>
      <p className="plan-description">{description}</p>
      <ul className="plan-features">
        {features.map((feature, index) => (
          <li key={index} className={feature.included ? 'included' : 'excluded'}>
            <span className="feature-icon">{feature.included ? '✓' : '×'}</span>
            <span className="feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>
      <button className={`btn ${isPopular ? 'btn-primary' : 'btn-outline'} btn-block`}>
        {buttonText}
      </button>
    </div>
  );
};

export default PricingPlan; 