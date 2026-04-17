import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

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
    navigate('/booking');
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

      {/* Features Section */}
      <section className="features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🏨</div>
            <h3>Premium Rooms</h3>
            <p>Luxurious accommodations with modern amenities and comfort</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Fine Dining</h3>
            <p>Exquisite culinary experiences prepared by expert chefs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💆</div>
            <h3>Spa & Wellness</h3>
            <p>Relax and rejuvenate with our world-class spa facilities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎵</div>
            <h3>Entertainment</h3>
            <p>Enjoy live music, events, and entertainment activities</p>
          </div>
        </div>
      </section>

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
