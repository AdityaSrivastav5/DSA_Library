import { useState } from 'react';
import './Footer.css';

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
        setFormData({ name: '', email: '', message: '' }); // Reset form
        setTimeout(() => setShowConfirmation(false), 3000);

      } else {
        setIsError(true);
        setShowConfirmation(true); // Show error message
        setTimeout(() => setShowConfirmation(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setIsError(true);
      setShowConfirmation(true); // Show error message
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  return (
    <footer id="contact-section" className="footer">
      <div className="footer-container">
        <div className="footer-right">
          <h4>Feedback</h4>
          <form className="feedback-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Feedback"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>
            <button type="submit">Submit</button>
          </form>
          {showConfirmation && (
            <div className={`confirmation-box ${isError ? 'error' : 'success'}`}>
              {isError ? 'Failed to submit feedback. Please try again.' : 'Feedback submitted successfully!'}
            </div>
          )}
        </div>

        <div className="footer-right">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a className="facebook" href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a className="twitter" href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a className="instagram" href="https://www.instagram.com/achieve_more_regularly/" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a className="linkedin" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <div className='contact'>
            <h4>Contact Us</h4>
            <div className='gmail'>
              achievemoreregularly@gmail.com
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
