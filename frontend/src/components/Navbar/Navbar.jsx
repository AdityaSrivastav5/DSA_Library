import './Navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="#">LOGO</Link>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <Link to="#">
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
                    <Link to="#">
                        Reminder
                        <i className=""></i> {/* Font Awesome icon */}
                    </Link>
                </li>
            </ul>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="icons">
                <Link to="#"><i className="fa-solid fa-right-from-bracket"></i></Link>
                <Link to="#"><i className="fas fa-user"></i></Link>
            </div>
        </nav>
    );
};

export default Navbar;
