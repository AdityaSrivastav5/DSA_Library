import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here, such as sending the data to a backend
    console.log('Feedback Submitted:', formData);
    setFormData({ name: '', email: '', message: '' }); // Reset form after submission
  };



  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3>AMR</h3>
          <p>Level up your coding skills with daily challenges and curated resources!</p>
        </div>

        <div className="footer-right">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

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
        </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AMR. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
