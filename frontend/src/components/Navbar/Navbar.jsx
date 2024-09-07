import './Navbar.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="#">LOGO</Link>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="/">
                        Home
                        <i className=""></i> {/* Font Awesome icon */}
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <Link to="#">
                        Topics
                        <i className="fas fa-chevron-up icon"></i> {/* Font Awesome icon */}
                    </Link>
                    <ul className="dropdown-content">
                        <li><Link to="#">Topic 1</Link></li>
                        <li><Link to="#">Topic 2</Link></li>
                        <li><Link to="#">Topic 3</Link></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <Link to="/reminder">
                        Reminder
                        <i className=""></i> {/* Font Awesome icon */}
                    </Link>
                </li>
            </ul>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="icons">
                {/* Clerk Authentication Buttons */}
                <div className="auth-buttons">
                    <SignedOut>
                        <SignInButton asChild>
                            <button
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: isHovered ? '#262626' : '#000000', // Lighter shade on hover
                                    color: 'white',
                                    fontFamily: 'sans-serif',
                                    fontSize: '21px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease' // Smooth transition for hover effect
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
                                        width: '45px', // Customize width
                                        height: '45px', // Customize height
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
