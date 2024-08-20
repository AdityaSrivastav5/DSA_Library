import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <a href="#">LOGO</a>
            </div>
            <ul className="nav-links">
                <li className="nav-item">
                    <a href="#">
                        Home
                        <i className="fas fa-chevron-up icon"></i> {/* Font Awesome icon */}
                    </a>
                </li>
                <li className="nav-item dropdown">
                    <a href="#">
                        Topics
                        <i className="fas fa-chevron-up icon"></i> {/* Font Awesome icon */}
                    </a>
                    <ul className="dropdown-content">
                        <li><a href="#">Topic 1</a></li>
                        <li><a href="#">Topic 2</a></li>
                        <li><a href="#">Topic 3</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a href="#">
                        Reminder
                        <i className="fas fa-chevron-up icon"></i> {/* Font Awesome icon */}
                    </a>
                </li>
            </ul>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="icons">
                <a href="#"><i className="fas fa-bell"></i></a>
                <a href="#"><i className="fas fa-user"></i></a>
            </div>
        </nav>
    );
};

export default Navbar;
