import "./Navbar.css";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import logo from "../../assets/LOGO.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DSAQuestion from "../../data/DSAQuestion.json";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const navbarRef = useRef(null);

  // Close suggestions and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (user) {
      const clerkUserId = user.id;
      const email = user.emailAddresses[0].emailAddress;
      const username = user.username ? user.username.trim() : clerkUserId || email;
      sendUserDataToBackend(clerkUserId, email, username);
    }
  }, [user]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    const lowerCaseTerm = searchTerm.toLowerCase();
    const results = [];

    DSAQuestion.forEach((topic) => {
      if (topic.topicName.toLowerCase().includes(lowerCaseTerm)) {
        results.push({
          type: "Topic",
          name: topic.topicName,
          path: `/${topic.topicName.replace(/\s+/g, "-").replace(/&/g, "and").toLowerCase()}`,
        });
      }

      let questionCount = 0;
      topic.questions.forEach((question) => {
        if (questionCount < 3 && question.Problem.toLowerCase().includes(lowerCaseTerm)) {
          results.push({
            type: "Question",
            name: question.Problem,
            path: `/${topic.topicName.replace(/\s+/g, "-").replace(/&/g, "and").toLowerCase()}`,
            difficulty: question.difficulty,
          });
          questionCount++;
        }
      });
    });

    setSuggestions(results.slice(0, 5));
  }, [searchTerm]);

  const sendUserDataToBackend = async (clerkUserId, email, username) => {
    try {
      await axios.post("https://dsa-library.onrender.com/user/add-user", {
        clerkUserId,
        email,
        username,
      });
    } catch (error) {
      console.error("Error sending user data to backend:", error);
    }
  };

  const handleSearch = (suggestion = null) => {
    const searchValue = suggestion ? suggestion.name : searchTerm;
    if (!searchValue.trim()) return;

    if (suggestion) {
      navigate(suggestion.path);
      setSearchTerm("");
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
      return;
    }

    const matchData = DSAQuestion.find(
      (topic) =>
        topic.topicName.toLowerCase() === searchValue.toLowerCase() ||
        topic.questions.some(
          (question) => question.Problem.toLowerCase() === searchValue.toLowerCase()
        )
    );

    if (matchData) {
      const formattedTopicName = matchData.topicName
        .replace(/\s+/g, "-")
        .replace(/&/g, "and")
        .toLowerCase();
      navigate(`/${encodeURIComponent(formattedTopicName)}`);
      setSearchTerm("");
      setShowSuggestions(false);
      setIsMobileMenuOpen(false);
    } else {
      triggerAlert();
      setSearchTerm("");
    }
  };

  const triggerAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleScrollToFooter = (e) => {
    e.preventDefault();
    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <nav className="navbar" ref={navbarRef}>
      <div className="logo">
        <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
          <img src={logo} width={120} height="auto" alt="DSA Library Logo" />
        </Link>
      </div>

      <button 
        className="menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <div className={`nav-content ${isMobileMenuOpen ? "active" : ""}`}>
        <ul className="nav-links">
          <li className="nav-item">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/topics" onClick={() => setIsMobileMenuOpen(false)}>Topics</Link>
          </li>
          <li className="nav-item">
            <Link to="/reminder" onClick={() => setIsMobileMenuOpen(false)}>Reminder</Link>
          </li>
          <li className="nav-item">
            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/grind75" onClick={() => setIsMobileMenuOpen(false)}>Grind 75</Link>
          </li>
          <li className="nav-item">
            <Link to="/ide" onClick={() => setIsMobileMenuOpen(false)}>Online Compiler</Link>
          </li>
          <li className="nav-item">
            <Link to="#" onClick={handleScrollToFooter}>Contact</Link>
          </li>
        </ul>

        <div className="search-container" ref={searchRef}>
          <div className={`search-bar ${isSearchFocused ? "focused" : ""}`}>
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search topics or problems..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setIsSearchFocused(true);
                if (searchTerm) setShowSuggestions(true);
              }}
              onBlur={() => setIsSearchFocused(false)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={clearSearch} aria-label="Clear search">
                <FiX />
              </button>
            )}
          </div>

          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSearch(item)}
                >
                  <div className="suggestion-header">
                    <span className="suggestion-type">{item.type}</span>
                    {item.difficulty && (
                      <span className={`suggestion-difficulty ${item.difficulty.toLowerCase()}`}>
                        {item.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="suggestion-name">{item.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="auth-section">
          <SignedOut>
            <SignInButton>
              <button className="signin-btn">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "42px",
                    height: "42px",
                  },
                  userButtonPopoverCard: {
                    backgroundColor: "#1a1a2e",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </div>

      {showAlert && (
        <div className="alert-box">
          <span className="alert-message">
            Topic not found. Try another search term.
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;