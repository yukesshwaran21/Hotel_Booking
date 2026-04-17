import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';
import AmenitiesSection from './AmenitiesSection';

const HomePage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data.slice(0, 3)); // Show only first 3 rooms
        setLoading(false);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to load rooms');
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleBookingClick = () => {
    navigate('/rooms');
  };

  const handleViewAllRooms = () => {
    navigate('/rooms');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Luxury Hotels</h1>
          <p className="hero-subtitle">Discover Your Perfect Stay</p>
          <p className="hero-description">
            Experience world-class hospitality with our premium rooms and exceptional services
          </p>
          <button className="hero-button" onClick={handleBookingClick}>
            Book Now
          </button>
        </div>
      </section>

      {/* Amenities Section */}
      <AmenitiesSection />

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <div className="why-container">
          <h2>Why Choose Us?</h2>
          <div className="why-content">
            <div className="why-item">
              <h4>✓ Best Price Guarantee</h4>
              <p>We offer the most competitive rates in the market with no hidden charges</p>
            </div>
            <div className="why-item">
              <h4>✓ 24/7 Customer Support</h4>
              <p>Our dedicated team is always available to assist you with any queries</p>
            </div>
            <div className="why-item">
              <h4>✓ Secure Booking</h4>
              <p>Your personal and payment information is protected with advanced encryption</p>
            </div>
            <div className="why-item">
              <h4>✓ Easy Cancellation</h4>
              <p>Cancel your booking anytime with our flexible cancellation policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-us">
        <div className="about-container">
          <div className="about-content">
            <h2>About Our Hotel</h2>
            <p>
              Luxury Hotels is a premier hospitality destination dedicated to providing unforgettable experiences.
              With over 20 years of excellence in the industry, we have established ourselves as a leader in luxury
              accommodations and distinguished service.
            </p>
            <div className="about-features">
              <div className="about-feature">
                <h4>Our Mission</h4>
                <p>
                  To deliver exceptional hospitality by combining luxury, comfort, and personalized service that exceeds
                  our guests' expectations.
                </p>
              </div>
              <div className="about-feature">
                <h4>Our Vision</h4>
                <p>
                  To be the most trusted and preferred hotel choice for travelers seeking premium accommodations and
                  world-class amenities.
                </p>
              </div>
              <div className="about-feature">
                <h4>Our Values</h4>
                <p>
                  Excellence, integrity, sustainability, and a genuine commitment to guest satisfaction are at the heart
                  of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotel Details & Location Section */}
      <section className="hotel-details-section" aria-label="Hotel details and location">
        <div className="hotel-details-container">
          {/* Left Column - Hotel Details */}
          <div className="hotel-details-column" role="region" aria-labelledby="hotel-title">
            {/* Hotel Header */}
            <div className="hotel-header">
              <h2 id="hotel-title" className="hotel-name">Luxury Grand Resort</h2>
              <div className="hotel-rating" aria-label="Rating: 4.8 out of 5 stars">
                <span className="stars">★★★★★</span>
                <span className="rating-value">4.8</span>
                <span className="rating-count">(2,456 reviews)</span>
              </div>
            </div>

            {/* Hotel Contact Info */}
            <div className="hotel-contact" role="complementary">
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">📍</span>
                <div className="contact-text">
                  <strong>Address:</strong>
                  <p>123 Luxury Avenue, New York, NY 10001, USA</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">📞</span>
                <div className="contact-text">
                  <strong>Phone:</strong>
                  <a href="tel:+15551234567">+1 (555) 123-4567</a>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon" aria-hidden="true">✉️</span>
                <div className="contact-text">
                  <strong>Email:</strong>
                  <a href="mailto:info@luxuryhotels.com">info@luxuryhotels.com</a>
                </div>
              </div>
            </div>


            {/* Price Range */}
            <div className="hotel-price-range">
              <p><strong>Price Range:</strong> $199 - $1,299 per night</p>
              <p className="price-note">Prices vary by room type and season</p>
            </div>

            {/* Book Now CTA */}
            <button 
              className="hotel-book-btn" 
              onClick={handleBookingClick}
              aria-label="Book a room at Luxury Grand Resort"
            >
              Book Now
            </button>
          </div>

          {/* Right Column - Map */}
          <div className="hotel-map-column" role="region" aria-labelledby="map-title">
            <h3 id="map-title" className="map-title">Location</h3>
            <div className="map-container">
              <iframe
                title="Luxury Grand Resort location on Google Maps"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890!2d-74.00601!3d40.71278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22bb96a06f%3A0x123456789!2sLuxury%20Hotels!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="map-description">
              Located in the heart of Manhattan, our resort is easily accessible from major transport hubs 
              and surrounded by iconic landmarks.
            </p>
            <a 
              href="https://maps.google.com/?q=123+Luxury+Avenue+New+York+NY+10001" 
              target="_blank" 
              rel="noopener noreferrer"
              className="maps-link"
              aria-label="Open location in Google Maps (opens in new tab)"
            >
              📍 Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready for Your Next Adventure?</h2>
        <p>Find and book your perfect room in just a few clicks</p>
        <button className="cta-button" onClick={handleBookingClick}>
          Start Booking Today
        </button>
      </section>
    </div>
  );
};

export default HomePage;
