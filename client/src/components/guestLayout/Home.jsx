import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import About from './About';
import Services from './Services';
import Contact from './Contact';

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const carouselImageStyle = {
    height: '100vh',
    objectFit: 'cover',
    width: '100%',
    filter: 'brightness(0.7)',
    transition: 'filter 0.8s ease'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)',
    zIndex: 1
  };

  const captionContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    padding: '2rem'
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 6vw, 5rem)',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '1.5rem',
    textAlign: 'center',
    lineHeight: '1.1',
    letterSpacing: '-0.5px',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    maxWidth: '1000px'
  };

  const subtitleStyle = {
    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '300',
    marginBottom: '2rem',
    textAlign: 'center',
    maxWidth: '900px',
    margin: '0 auto',
    lineHeight: '1.6',
    textShadow: '0 1px 5px rgba(0, 0, 0, 0.3)'
  };

  const ctaButtonStyle = {
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  };

  const carouselControlStyle = {
    width: '50px',
    height: '50px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    backdropFilter: 'blur(10px)',
    margin: '0 20px',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  /*const indicatorStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: 'none',
    margin: '0 6px'
  };*/

  /*const activeIndicatorStyle = {
    ...indicatorStyle,
    backgroundColor: '#ffffff',
    transform: 'scale(1.2)'
  };*/

  const contentWrapperStyle = {
    maxWidth: '1200px',
    width: '100%',
    padding: '0 2rem'
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={4000}
        fade={true}
        indicators={true}
        nextIcon={
          <span style={carouselControlStyle} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </span>
        }
        prevIcon={
          <span style={carouselControlStyle} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </span>
        }
        indicatorLabels={[]}
      >
        <Carousel.Item>
          <div style={{ position: 'relative', height: '100vh' }}>
            <img
              src='https://studyinginswitzerland.com/wp-content/uploads/2025/04/image-asset.jpeg'
              alt="Student Management"
              style={carouselImageStyle}
            />
            <div style={overlayStyle}></div>
            <div style={captionContainerStyle}>
              <div style={contentWrapperStyle}>
                <h1 style={titleStyle}>Student Management System</h1>
                <p style={subtitleStyle}>
                  Streamlining academic administration with cutting-edge<br />
                  technology for seamless educational experiences
                </p>
                <div style={{ textAlign: 'center' }}>
                  <button 
                    style={ctaButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        
        <Carousel.Item>
          <div style={{ position: 'relative', height: '100vh' }}>
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwYWRtaW58ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000"
              alt="Efficient Administration"
              style={carouselImageStyle}
            />
            <div style={overlayStyle}></div>
            <div style={captionContainerStyle}>
              <div style={contentWrapperStyle}>
                <h1 style={titleStyle}>Efficient Administration</h1>
                <p style={subtitleStyle}>
                  Comprehensive tools for administrators to manage students,<br />
                  courses, and academic records efficiently
                </p>
                <div style={{ textAlign: 'center' }}>
                  <button 
                    style={ctaButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
        
        <Carousel.Item>
          <div style={{ position: 'relative', height: '100vh' }}>
            <img
              src="https://crewcare.co.nz/admin_assets/blog/teaching-children-to-be-responsible.jpg"
              alt="Interactive Learning"
              style={carouselImageStyle}
            />
            <div style={overlayStyle}></div>
            <div style={captionContainerStyle}>
              <div style={contentWrapperStyle}>
                <h1 style={titleStyle}>Interactive Learning</h1>
                <p style={subtitleStyle}>
                  Empowering educators and students with collaborative tools<br />
                  for enhanced teaching and learning outcomes
                </p>
                <div style={{ textAlign: 'center' }}>
                  <button 
                    style={ctaButtonStyle}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    Explore Features
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>
      
      <div>
        <About />
        <Services />
        <Contact />
      </div>
    </div>
  );
};

export default Home;