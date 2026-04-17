import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Luxury Hotels | Seamless booking for every trip</p>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><strong>Email:</strong> support@luxuryhotels.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Address:</strong> 123 Luxury Avenue, New York, NY 10001, USA</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/rooms">Rooms</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>
            <a href="#facebook">Facebook</a> | <a href="#twitter">Twitter</a> | <a href="#instagram">Instagram</a>
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2026 Luxury Hotels. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
