import React, { useState } from 'react';
import './AmenitiesSection.css';

const AmenitiesSection = () => {
  const [activeAmenity, setActiveAmenity] = useState(null);

  const amenities = [
    {
      id: 'pool',
      icon: '🏊',
      title: 'Olympic Pool',
      description: 'Relax in our stunning infinity pool with heated water and panoramic views',
      features: ['Heated Water', 'Infinity Edge', 'Poolside Bar'],
      color: 'var(--amenity-blue)'
    },
    {
      id: 'spa',
      icon: '💆',
      title: 'Luxury Spa',
      description: 'Indulge in rejuvenating spa treatments and wellness therapies',
      features: ['Professional Massage', 'Sauna & Steam', 'Beauty Treatments'],
      color: 'var(--amenity-rose)'
    },
    {
      id: 'dining',
      icon: '🍽️',
      title: 'Fine Dining',
      description: 'Experience world-class cuisine crafted by award-winning chefs',
      features: ['International Cuisine', 'Michelin Chef', '24/7 Room Service'],
      color: 'var(--amenity-gold)'
    },
    {
      id: 'fitness',
      icon: '🏋️',
      title: 'Fitness Center',
      description: 'State-of-the-art gym facilities with personal training services',
      features: ['Modern Equipment', 'Personal Trainers', 'Yoga Classes'],
      color: 'var(--amenity-green)'
    },
    {
      id: 'entertainment',
      icon: '🎭',
      title: 'Entertainment',
      description: 'Enjoy live performances, events, and recreational activities',
      features: ['Live Shows', 'Gaming Zone', 'Movie Theater'],
      color: 'var(--amenity-purple)'
    },
    {
      id: 'concierge',
      icon: '🎩',
      title: 'Concierge Service',
      description: 'Personalized assistance for all your travel and entertainment needs',
      features: ['24/7 Availability', 'Travel Planning', 'Reservations'],
      color: 'var(--amenity-teal)'
    }
  ];

  const handleCardKeyPress = (e, amenityId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveAmenity(activeAmenity === amenityId ? null : amenityId);
      // Smooth scroll to card
      const element = document.getElementById(`amenity-${amenityId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  return (
    <section className="amenities-section" role="region" aria-label="Hotel Amenities and Services">
      <div className="amenities-container">
        {/* Section Header */}
        <div className="amenities-header">
          <h2 id="amenities-title" className="amenities-title">World-Class Amenities</h2>
          <p className="amenities-subtitle">Discover our premium facilities and services</p>
        </div>

        {/* Amenities Grid */}
        <div className="amenities-grid" role="list" aria-labelledby="amenities-title">
          {amenities.map((amenity) => (
            <article
              key={amenity.id}
              id={`amenity-${amenity.id}`}
              className="amenity-card"
              role="listitem"
              tabIndex="0"
              onClick={() => setActiveAmenity(activeAmenity === amenity.id ? null : amenity.id)}
              onKeyPress={(e) => handleCardKeyPress(e, amenity.id)}
              aria-expanded={activeAmenity === amenity.id}
              aria-label={`${amenity.title}: ${amenity.description}`}
            >
              {/* Icon Wrapper */}
              <div className="icon-wrapper" style={{ backgroundColor: amenity.color }}>
                <span className="amenity-icon" role="img" aria-label={amenity.title}>
                  {amenity.icon}
                </span>
                {/* Decorative gradient circles */}
                <div className="gradient-circle gradient-circle-1" aria-hidden="true" />
                <div className="gradient-circle gradient-circle-2" aria-hidden="true" />
              </div>

              {/* Content */}
              <div className="amenity-content">
                <h3 className="amenity-title">{amenity.title}</h3>
                <p className="amenity-description">{amenity.description}</p>

                {/* Features List */}
                <ul className="amenity-features" role="list" aria-label={`Features of ${amenity.title}`}>
                  {amenity.features.map((feature, index) => (
                    <li key={index} role="listitem" className="feature-item">
                      <span className="feature-dot" style={{ backgroundColor: amenity.color }} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <footer className="amenity-footer">
                <a
                  href="#booking"
                  className="amenity-link"
                  aria-label={`Learn more about ${amenity.title}`}
                >
                  Learn More →
                </a>
              </footer>
            </article>
          ))}
        </div>

        {/* CTA Box */}
        <div className="amenities-cta" role="complementary" aria-label="Call to action for booking">
          <h3>Experience the Ultimate Luxury</h3>
          <p>Book your stay today and enjoy our world-class amenities</p>
          <button className="amenities-cta-btn" aria-label="Book now to experience our amenities">
            Book Your Stay
          </button>
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
