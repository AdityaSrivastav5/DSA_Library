import './Navbar.css';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';
import logo from "../../assets/LOGO.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import DSAQuestion from '../../data/DSAQuestion.json'; // Import JSON file directly

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [searchTopic, setSearchTopic] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { user } = useUser();  // Clerk user object
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const clerkUserId = user.id;
      const email = user.emailAddresses[0].emailAddress;
      const username = user.username ? user.username.trim() : clerkUserId || email;

      sendUserDataToBackend(clerkUserId, email, username);
    }
  }, [user]);

  const sendUserDataToBackend = async (clerkUserId, email, username) => {
    try {
      await axios.post('http://localhost:5003/user/add-user', {
        clerkUserId,
        email,
        username,
      });
    } catch (error) {
      console.error('Error sending user data to backend:', error);
    }
  };

  const handleSearch = () => {
    console.log("Searching for topic:", searchTopic);
  
    // Find the first match for either topicName or problem name in questions
    const matchData = DSAQuestion.find(topic =>
      topic.topicName.toLowerCase() === searchTopic.toLowerCase() ||
      topic.questions.some(question => 
        question.Problem.toLowerCase() === searchTopic.toLowerCase()
      )
    );
  
    if (matchData) {
      // If we matched a topicName
      if (matchData.topicName.toLowerCase() === searchTopic.toLowerCase()) {
        const formattedTopicName = matchData.topicName
          .replace(/\s+/g, '-')  // Replace spaces with hyphens
          .replace(/&/g, 'and')  // Replace '&' with 'and'
          .toLowerCase();
        const redirectPath = `/${encodeURIComponent(formattedTopicName)}`;  // Redirect to the topic page
        console.log("Redirecting to topic:", redirectPath);
        navigate(redirectPath);
      } 
      // If we matched a Problem
      else {
        // Find the question that matched the problem name
        const matchedQuestion = matchData.questions.find(question => 
          question.Problem.toLowerCase() === searchTopic.toLowerCase()
        );
  
        if (matchedQuestion) {
          const formattedTopicName = matchData.topicName
            .replace(/\s+/g, '-')  // Replace spaces with hyphens
            .replace(/&/g, 'and')  // Replace '&' with 'and'
            .toLowerCase();
          
          const redirectPath = `/${encodeURIComponent(formattedTopicName)}`;  // Redirect to the topic page
          console.log("Redirecting to topic for problem:", redirectPath);
          navigate(redirectPath);
        }
      }
  
      setSearchTopic(''); // Clear search bar after successful navigation
    } else {
      console.log("No match found - showing alert");
      triggerAlert(); // Show alert if no match found
      setSearchTopic('');
    }
  };

  const triggerAlert = () => {
    console.log("Triggering alert"); // Check if this is called
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
        <Link to="/"><img src={logo} width={120} height='auto' alt="Logo" /></Link>
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/reminder">Reminder</Link>
        </li>
        <li className="nav-item dropdown">
          <Link to="#" onClick={handleScrollToFooter}>Contact Us</Link>
        </li>
      </ul>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTopic}
          onChange={(e) => setSearchTopic(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger search on Enter key press
        />
      </div>
      {showAlert && (
        <div className="alert-box">
          <i className="fas fa-exclamation-triangle alert-icon"></i>
          <span>Topic not Found</span>
        </div>
      )}
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
