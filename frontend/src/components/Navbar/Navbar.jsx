import './Navbar.css';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import axios from "axios";
import logo from "../../assets/LOGO.png";

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { user } = useUser();  // Clerk user object

  useEffect(() => {
    if (user) {
      const clerkUserId = user.id;
      const email = user.emailAddresses[0].emailAddress;
      const username = user.username ? user.username.trim() : clerkUserId || email;

      console.log('User details:', { clerkUserId, email, username });
      sendUserDataToBackend(clerkUserId, email, username);
    }
  }, [user]);

  const sendUserDataToBackend = async (clerkUserId, email, username) => {
    try {
      console.log('Sending user data:', { clerkUserId, email, username });
      const response = await axios.post('http://localhost:5003/user/add-user', {
        clerkUserId,
        email,
        username,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };

  const handleScrollToFooter = (e) => {
    e.preventDefault();
    const footerElement = document.getElementById('contact-section');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="#"><img src={logo} width={120} height='auto' alt="Logo" /></Link>
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/reminder">
            Reminder
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link to="#" onClick={handleScrollToFooter}>
            Contact Us
          </Link>
        </li>
      </ul>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="icons">
        <div className="auth-buttons">
          <SignedOut>
            <SignInButton asChild>
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: isHovered ? '#262626' : '#000000',
                  color: 'white',
                  fontFamily: 'sans-serif',
                  fontSize: '21px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: '45px',
                    height: '45px',
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
