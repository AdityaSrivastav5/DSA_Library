
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="feedback-section">
        <h2 className="feedback-title">Feedback</h2>
        <div className="text-area-container">
          <textarea
            className="text-area"
            placeholder="Tell us about experience....."
          ></textarea>
          <button className="button">Button</button>
        </div>
      </div>
      <div className="social-icons">
        <a href="https://facebook.com" className="icon-link">
          <FontAwesomeIcon icon={faFacebookF} size="2x" />
        </a>
        <a href="https://twitter.com" className="icon-link">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
        <a href="https://instagram.com" className="icon-link">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </a>
        <a href="https://linkedin.com" className="icon-link">
          <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
