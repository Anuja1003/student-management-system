import React from 'react';
import { Nav } from 'react-bootstrap';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <style>
        {`
        /* Footer Section */
        .footer-section {
            background: linear-gradient(135deg, #1a1a1a 0%, #2c3e50 100%);
            color: #fff;
            position: relative;
            overflow: hidden;
            padding: 80px 0 30px;
            border-top: 3px solid transparent;
            border-image: linear-gradient(90deg, #667eea, #764ba2, #ffd200);
            border-image-slice: 1;
        }

        .footer-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 210, 0, 0.05) 0%, transparent 50%);
            z-index: 1;
        }

        .footer-section .container {
            position: relative;
            z-index: 2;
        }

        /* Footer Logo */
        .ft-logo {
            font-size: 2.5rem;
            font-weight: 800;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 30px;
            position: relative;
            display: inline-block;
            padding-bottom: 15px;
            opacity: 0;
            animation: fadeInUp 0.8s ease forwards;
        }

        .ft-logo::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 2px;
        }

        .ft-logo span {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ffd200 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        /* Copyright Text */
        .copyright-text {
            text-align: center;
            margin: 40px 0;
            font-size: 1rem;
            color: #a0aec0;
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.2s forwards;
        }

        .copyright-text p {
            margin: 0;
            line-height: 1.6;
        }

        .copyright-text a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            position: relative;
            margin-left: 5px;
        }

        .copyright-text a::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.3s ease;
        }

        .copyright-text a:hover {
            color: #ffd200;
        }

        .copyright-text a:hover::after {
            width: 100%;
        }

        .copyright-text .fa-heart {
            color: #ff6b6b;
            margin: 0 5px;
            animation: heartbeat 1.5s ease infinite;
        }

        /* Social Icons */
        .social-icons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 30px;
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.4s forwards;
        }

        .social-icon {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 1.2rem;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            overflow: hidden;
            border: 2px solid transparent;
        }

        .social-icon::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            z-index: -1;
            transition: transform 0.4s ease;
        }

        .social-icon::after {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(135deg, #667eea, #764ba2, #ffd200);
            border-radius: 50%;
            z-index: -2;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        /* Individual Social Icon Colors */
        .social-icon:nth-child(1)::before { background: linear-gradient(135deg, #1877f2, #3b5998); } /* Facebook */
        .social-icon:nth-child(2)::before { background: linear-gradient(135deg, #1da1f2, #00acee); } /* Twitter */
        .social-icon:nth-child(3)::before { background: linear-gradient(135deg, #0077b5, #00a0dc); } /* LinkedIn */
        .social-icon:nth-child(4)::before { background: linear-gradient(135deg, #e4405f, #c13584); } /* Instagram */
        .social-icon:nth-child(5)::before { background: linear-gradient(135deg, #ff0000, #c4302b); } /* YouTube */

        .social-icon:hover {
            transform: translateY(-5px) scale(1.1);
            border-color: rgba(255, 255, 255, 0.2);
        }

        .social-icon:hover::before {
            transform: scale(1.1);
        }

        .social-icon:hover::after {
            opacity: 1;
        }

        .social-icon i {
            transition: transform 0.3s ease;
        }

        .social-icon:hover i {
            transform: scale(1.2);
        }

        /* Footer Links (Optional - if you want to add them later) */
        .footer-links {
            list-style: none;
            padding: 0;
            margin: 30px 0;
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
            opacity: 0;
            animation: fadeInUp 0.8s ease 0.3s forwards;
        }

        .footer-links li {
            position: relative;
        }

        .footer-links li a {
            color: #a0aec0;
            font-size: 1rem;
            text-decoration: none;
            padding: 8px 15px;
            border-radius: 20px;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .footer-links li a:hover {
            color: #fff;
            background: rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        .footer-links li a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 20px;
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 1px;
            transition: transform 0.3s ease;
        }

        .footer-links li a:hover::after {
            transform: translateX(-50%) scaleX(1);
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes heartbeat {
            0%, 100% {
                transform: scale(1);
            }
            25% {
                transform: scale(1.1);
            }
            50% {
                transform: scale(1);
            }
            75% {
                transform: scale(1.1);
            }
        }

        /* Responsive Design */
        @media (max-width: 991px) {
            .footer-section {
                padding: 60px 0 25px;
            }
            
            .ft-logo {
                font-size: 2rem;
            }
            
            .social-icon {
                width: 45px;
                height: 45px;
                font-size: 1.1rem;
            }
            
            .footer-links {
                gap: 20px;
            }
        }

        @media (max-width: 768px) {
            .footer-section {
                padding: 50px 0 20px;
            }
            
            .ft-logo {
                font-size: 1.8rem;
                margin-bottom: 25px;
            }
            
            .copyright-text {
                font-size: 0.9rem;
                margin: 30px 0;
            }
            
            .social-icons {
                gap: 15px;
            }
            
            .social-icon {
                width: 40px;
                height: 40px;
                font-size: 1rem;
            }
            
            .footer-links {
                flex-direction: column;
                gap: 15px;
                margin: 25px 0;
            }
            
            .footer-links li a {
                font-size: 0.95rem;
                padding: 6px 12px;
            }
        }

        @media (max-width: 576px) {
            .footer-section {
                padding: 40px 0 20px;
            }
            
            .ft-logo {
                font-size: 1.5rem;
                margin-bottom: 20px;
            }
            
            .copyright-text {
                font-size: 0.85rem;
            }
            
            .social-icons {
                gap: 12px;
            }
            
            .social-icon {
                width: 36px;
                height: 36px;
                font-size: 0.9rem;
            }
        }

        /* Wave Effect (Optional) */
        .wave-container {
            position: absolute;
            top: -100px;
            left: 0;
            width: 100%;
            height: 100px;
            overflow: hidden;
            z-index: 1;
        }

        .wave {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 200%;
            height: 100px;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z' fill='rgba(102,126,234,0.1)'/%3E%3C/svg%3E");
            background-size: 1000px 100px;
            animation: wave 25s linear infinite;
        }

        @keyframes wave {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-50%);
            }
        }
        `}
      </style>
      <footer className="footer-section">
        <div className="wave-container">
          <div className="wave"></div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-text">
                <div className="ft-logo">
                  Student <span>Management</span>
                </div>
                
                {/* Optional Footer Links - Uncomment if needed */}
                 <ul className="footer-links">
                  <li><Nav.Link href="/home">Home</Nav.Link></li>
                  <li><Nav.Link href="/about">About</Nav.Link></li>
                  <li><Nav.Link href="/services">Services</Nav.Link></li>
                  <li><Nav.Link href="/contact">Contact</Nav.Link></li>
                </ul> 
                
                <div className="copyright-text">
                  <p>
                    Copyright &copy; {currentYear} All rights reserved | Made with 
                    <i className="fa fa-heart" aria-hidden="true"></i> by
                    <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer" aria-label="Visit Colorlib">
                      Student Management Team
                    </a>
                  </p>
                </div>
                
                <div className="social-icons">
                  <Nav className="justify-content-center">
                    <Nav.Link href="https://facebook.com" className="social-icon" aria-label="Visit our Facebook" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-facebook"></i>
                    </Nav.Link>
                    <Nav.Link href="https://twitter.com" className="social-icon" aria-label="Visit our Twitter" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-twitter"></i>
                    </Nav.Link>
                    <Nav.Link href="https://linkedin.com" className="social-icon" aria-label="Visit our LinkedIn" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-linkedin"></i>
                    </Nav.Link>
                    <Nav.Link href="https://instagram.com" className="social-icon" aria-label="Visit our Instagram" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-instagram"></i>
                    </Nav.Link>
                    <Nav.Link href="https://youtube.com" className="social-icon" aria-label="Visit our YouTube" target="_blank" rel="noopener noreferrer">
                      <i className="fa fa-youtube-play"></i>
                    </Nav.Link>
                  </Nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AdminFooter;