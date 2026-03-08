import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const UserNavbar = () => {
    const navigate = useNavigate(); // ✅ initialize navigate

    // ----------------- Logout Function -----------------
    const handleLogout = () => {
        localStorage.removeItem('token'); // remove JWT token
        localStorage.removeItem('user');  // remove user info
        navigate('/login');               // redirect to login page
    };
    return (
        <>
           <style>
                {`
                /* Navbar Styles */
                .custom-navbar {
                    background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%) !important;
                    padding: 10px 0;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    border-bottom: 3px solid transparent;
                    border-image: linear-gradient(90deg, #667eea, #764ba2, #ffd200);
                    border-image-slice: 1;
                    transition: all 0.4s ease;
                }

                .custom-navbar.scrolled {
                    background: rgba(26, 26, 26, 0.95) !important;
                    backdrop-filter: blur(10px);
                    padding: 5px 0;
                }

                /* Brand Styles */
                .brandStyle {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    text-decoration: none !important;
                }

                .textAnimationStyle {
                    font-size: 24px;
                    font-weight: 800;
                    margin-left: 15px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ffd200 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    position: relative;
                    padding: 5px 0;
                }

                .textAnimationStyle::after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #667eea, #764ba2);
                    transition: width 0.3s ease;
                }

                .brandStyle:hover .textAnimationStyle::after {
                    width: 100%;
                }

                /* Logo Styles */
                .logo-container {
                    position: relative;
                    display: inline-block;
                }

                .logo {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 3px solid transparent;
                    background: linear-gradient(135deg, #667eea, #764ba2, #ffd200) border-box;
                    padding: 3px;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
                }

                .brandStyle:hover .logo {
                    transform: scale(1.1) rotate(10deg);
                    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.5);
                }

                /* Nav Items */
                .nav-item {
                    position: relative;
                    margin: 0 10px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #e2e8f0 !important;
                    text-decoration: none !important;
                    padding: 10px 20px !important;
                    border-radius: 25px;
                    transition: all 0.3s ease;
                }

                .nav-item::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    background: rgba(102, 126, 234, 0.1);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    transition: all 0.4s ease;
                    z-index: -1;
                }

                .nav-item:hover::before {
                    width: 100%;
                    height: 100%;
                    border-radius: 25px;
                }

                .nav-item:hover {
                    color: #ffffff !important;
                    transform: translateY(-2px);
                    background: rgba(102, 126, 234, 0.1);
                }

                .nav-item.active {
                    color: #ffffff !important;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                }

                .nav-item.active::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 20px;
                    height: 3px;
                    background: #ffd200;
                    border-radius: 2px;
                }

                /* Navbar Toggle */
                .navbar-toggler {
                    border: 2px solid rgba(102, 126, 234, 0.3);
                    padding: 8px 12px;
                    transition: all 0.3s ease;
                }

                .navbar-toggler:hover {
                    border-color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                }

                .navbar-toggler:focus {
                    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
                }

                .navbar-toggler-icon {
                    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28102, 126, 234, 0.8%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
                }

                /* Special buttons - Register & Login */
                .nav-item[href*="register"],
                .nav-item[href*="login"] {
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2));
                    border: 2px solid transparent;
                    border-image: linear-gradient(135deg, #667eea, #764ba2);
                    border-image-slice: 1;
                }

                .nav-item[href*="register"]:hover,
                .nav-item[href*="login"]:hover {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border: 2px solid transparent;
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
                }

                /* Mobile Menu */
                .navbar-collapse {
                    background: rgba(26, 26, 26, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: 15px;
                    padding: 20px;
                    margin-top: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                /* Dropdown Menu */
                .dropdown-menu {
                    background: rgba(26, 26, 26, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 15px;
                    padding: 10px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                }

                .dropdown-item {
                    color: #e2e8f0 !important;
                    padding: 10px 20px;
                    border-radius: 10px;
                    transition: all 0.3s ease;
                }

                .dropdown-item:hover {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: #ffffff !important;
                    transform: translateX(5px);
                }

                /* Responsive Design */
                @media (max-width: 992px) {
                    .textAnimationStyle {
                        font-size: 20px;
                        margin-left: 10px;
                    }

                    .logo {
                        width: 50px;
                        height: 50px;
                    }

                    .nav-item {
                        padding: 12px 15px !important;
                        margin: 5px 0;
                        text-align: center;
                    }

                    .nav-item.active::after {
                        bottom: -3px;
                    }
                }

                @media (max-width: 768px) {
                    .textAnimationStyle {
                        font-size: 18px;
                    }

                    .logo {
                        width: 45px;
                        height: 45px;
                    }

                    .custom-navbar {
                        padding: 8px 0;
                    }
                }

                @media (max-width: 576px) {
                    .textAnimationStyle {
                        font-size: 16px;
                    }

                    .logo {
                        width: 40px;
                        height: 40px;
                    }

                    .nav-item {
                        font-size: 14px;
                        padding: 10px !important;
                    }

                    .container {
                        padding-left: 15px;
                        padding-right: 15px;
                    }
                }

                /* Animation for navbar on scroll */
                @keyframes slideDown {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .custom-navbar {
                    animation: slideDown 0.5s ease;
                }

                /* Smooth hover effects */
                .nav-link {
                    position: relative;
                    overflow: hidden;
                }

                .nav-link span {
                    position: relative;
                    z-index: 1;
                }

                /* Pulse animation for active link */
                @keyframes pulse {
                    0% {
                        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
                    }
                }

                .nav-item.active {
                    animation: pulse 2s infinite;
                }
                `}
            </style>
            <Navbar collapseOnSelect expand="lg" variant="white" bg="white" className="custom-navbar navbarStyle">
                <Container>
                    <Navbar.Brand as={NavLink} to="/home" className="navbar-brand brandStyle">
                        <img
                            src="https://www.codester.com/static/uploads/items/000/008/8870/icon.png"
                            alt="Student Management Logo"
                            className="zoomEffect"
                            style={{
                                width: '50px',
                                height: 'auto',
                                borderRadius: "60px",
                                marginLeft: '-100px',
                            }}
                        />
                        <span className='textAnimationStyle'>
                            <span className='eventStyle'>Student</span>
                            <span className='managementStyle'>Management</span>
                        </span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" aria-label="Toggle navigation" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/user" className="nav-item navItemStyle" >Profile</Nav.Link>
                             <Nav.Link as={NavLink} to="/user/studentdashboard" className="nav-item navItemStyle" >Dashboard</Nav.Link>
                            <Nav.Link as={NavLink} to="/user/changePassword" className="nav-item navItemStyle" >Change Password</Nav.Link>
                            <Nav.Link as={NavLink} to="/user/details" className="nav-item navItemStyle" >View Details</Nav.Link>
                            <Nav.Link className="nav-item navItemStyle" onClick={handleLogout} style={{ cursor: 'pointer', color: 'red', fontWeight: 'bold' }} >
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default UserNavbar;