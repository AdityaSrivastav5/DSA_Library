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
            const username = user.username ? user.username.trim() : clerkUserId || email; // Fallback to an empty string if not available
    
            console.log('User details:', { clerkUserId, email, username }); // Log the values
    
            sendUserDataToBackend(clerkUserId, email, username);
        }
    }, [user]);
    

    // Function to send user data to backend
    const sendUserDataToBackend = async (clerkUserId, email, username) => {
        try {
            console.log('Sending user data:', { clerkUserId, email, username }); // Add this line
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

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="#"><img src={logo} width={120} height='auto'></img></Link>
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
