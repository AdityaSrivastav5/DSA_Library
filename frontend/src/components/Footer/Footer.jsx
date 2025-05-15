import { useState } from 'react';
import './Footer.css';
import { FiSend, FiMail, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setIsError(true);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
      return;
    }

    const feedbackData = {
      name: formData.name,
      email: formData.email,
      feedback: formData.message,
    };

    try {
      const response = await fetch('https://dsa-library.onrender.com/user/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        setIsError(false);
        setShowConfirmation(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowConfirmation(false), 3000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsError(true);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  return (
    <footer id="contact-section" className="footer">
      <div className="footer-wave"></div>
      
      <div className="footer-container">
        <div className="footer-form">
          <h3 className="footer-heading">Send Us Feedback</h3>
          <p className="footer-subheading">We'd love to hear your thoughts</p>
          
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              <FiSend className="send-icon" />
              Send Message
            </button>
          </form>
          
          {showConfirmation && (
            <div className={`confirmation-message ${isError ? 'error' : 'success'}`}>
              {isError ? 'Failed to submit. Please try again.' : 'Thank you for your feedback!'}
            </div>
          )}
        </div>
        
        <div className="footer-social">
          <h3 className="footer-heading">Connect With Us</h3>
          <p className="footer-subheading">Follow our journey</p>
          
          <div className="social-links">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FiFacebook className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FiTwitter className="social-icon" />
            </a>
            <a href="https://www.instagram.com/achieve_more_regularly/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FiInstagram className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FiLinkedin className="social-icon" />
            </a>
          </div>
          
          <div className="contact-info">
            <h4 className="contact-heading">Contact Information</h4>
            <div className="email-link">
              <FiMail className="mail-icon" />
              <a href="mailto:achievemoreregularly@gmail.com">achievemoreregularly@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AMR. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;  