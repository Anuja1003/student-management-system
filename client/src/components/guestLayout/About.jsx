import React from "react";

const About = () => {
  return (
    <>
       <style>
        {`
        /* About Section Styles */
        .about-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #ffd200 100%);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.95);
          z-index: 1;
        }

        .about-section .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        /* Gradient Background Animation */
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Section Title */
        .section-title {
          margin-bottom: 60px;
        }

        .section-title h2 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          text-transform: uppercase;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          position: relative;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
        }

        .section-title h2::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 2px;
        }

        .section-title p {
          font-size: 1.2rem;
          color: #4a4a4a;
          text-align: center;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
          font-weight: 300;
        }

        .f-para {
          font-style: italic;
          font-weight: 400;
          color: #666;
          font-size: 1.1rem;
          background: rgba(255, 255, 255, 0.9);
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-left: 5px solid #667eea;
          transition: all 0.3s ease;
        }

        .f-para:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          border-left: 5px solid #ffd200;
        }

        /* About Video */
        .about-video {
          margin-bottom: 30px;
          border-radius: 20px;
          overflow: hidden;
          transform: perspective(1000px) rotateY(-10deg);
          transition: all 0.5s ease;
          box-shadow: 20px 20px 60px rgba(0, 0, 0, 0.1),
                     -20px -20px 60px rgba(255, 255, 255, 0.7);
        }

        .about-video:hover {
          transform: perspective(1000px) rotateY(0deg);
          box-shadow: 0 25px 50px rgba(102, 126, 234, 0.3),
                     0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        .about-video iframe {
          width: 100%;
          height: 350px;
          border: none;
          transition: transform 0.3s ease;
        }

        .about-video:hover iframe {
          transform: scale(1.02);
        }

        /* About Text */
        .about-text {
          padding: 40px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          margin-top: 0;
          transition: all 0.3s ease;
        }

        .about-text:hover {
          transform: translateY(-10px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .about-text h3 {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 25px;
          color: #2c3e50;
          position: relative;
          padding-bottom: 15px;
        }

        .about-text h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 1.5px;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #555;
          margin-bottom: 25px;
          font-weight: 300;
        }

        /* Features List */
        .features-list {
          list-style: none;
          padding: 0;
          margin-top: 30px;
        }

        .features-list li {
          font-size: 1rem;
          color: #444;
          margin-bottom: 15px;
          padding: 12px 20px;
          background: rgba(102, 126, 234, 0.05);
          border-radius: 10px;
          border-left: 4px solid #667eea;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .features-list li:hover {
          background: rgba(102, 126, 234, 0.1);
          transform: translateX(10px);
          border-left: 4px solid #ffd200;
        }

        .features-list li .icon_check {
          display: inline-block;
          width: 24px;
          height: 24px;
          background: #667eea;
          border-radius: 50%;
          margin-right: 15px;
          position: relative;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .features-list li .icon_check::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        .features-list li:hover .icon_check {
          background: #ffd200;
          transform: scale(1.1);
        }

        /* CTA Button */
        .cta-button {
          display: inline-block;
          padding: 18px 40px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-transform: uppercase;
          font-weight: 600;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          letter-spacing: 1px;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 991px) {
          .about-section {
            padding: 80px 0;
          }
          
          .section-title h2 {
            font-size: 2.8rem;
          }
          
          .about-video {
            transform: perspective(1000px) rotateY(0deg);
          }
          
          .about-video iframe {
            height: 300px;
          }
          
          .about-text h3 {
            font-size: 1.8rem;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 60px 0;
          }
          
          .section-title h2 {
            font-size: 2.2rem;
          }
          
          .about-video iframe {
            height: 250px;
          }
          
          .about-text {
            padding: 30px;
            margin-top: 30px;
          }
          
          .about-text h3 {
            font-size: 1.6rem;
          }
          
          .cta-button {
            padding: 15px 30px;
            font-size: 1rem;
          }
          
          .features-list li {
            font-size: 0.95rem;
            padding: 10px 15px;
          }
        }

        @media (max-width: 576px) {
          .section-title h2 {
            font-size: 1.8rem;
          }
          
          .about-video iframe {
            height: 200px;
          }
          
          .about-text {
            padding: 20px;
          }
          
          .about-text h3 {
            font-size: 1.4rem;
          }
          
          .about-text p {
            font-size: 1rem;
          }
          
          .cta-button {
            padding: 12px 25px;
            font-size: 0.9rem;
          }
        }

        /* Animation Classes */
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
        }

        .animate-slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.8s ease forwards;
        }

        .animate-slide-right {
          opacity: 0;
          transform: translateX(-30px);
          animation: slideRight 0.8s ease forwards;
        }

        .animate-slide-left {
          opacity: 0;
          transform: translateX(30px);
          animation: slideLeft 0.8s ease forwards;
        }

        /* Animation Delays */
        .delay-1 { animation-delay: 0.3s; }
        .delay-2 { animation-delay: 0.6s; }
        .delay-3 { animation-delay: 0.9s; }
        .delay-4 { animation-delay: 1.2s; }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        `}
      </style>

      <section className="about-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>About Us: Transforming Student Management</h2>
                <p className="f-para">
                  We believe in simplifying and modernizing the way educational
  institutions manage students. From admissions to attendance and
  performance tracking, our system is designed to make academic
  management smarter, faster, and more efficient.
                </p>
              </div>
            </div>
          </div>

          {/* About Video and Text */}
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-video">
                {/* Embed YouTube Video */}
                <iframe
                  width="100%"
                  height="315"
                  src="https://www.youtube.com/embed/lljD-yXozSc?si=UObdYxWlPX6ko44s"
                  title="Event Overview Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-text">
                <h3>Student Management System: Where Education Meets Technology</h3>
                <p>
                  When we started building this Student Management System, our goal
  was to reduce manual work and bring clarity to academic operations.
  Our vision is simple: to empower educational institutions with a
  reliable, secure, and easy-to-use platform that manages student
  data efficiently. Today, our system helps administrators,
  teachers, and students stay connected and organized.
                </p>
                <ul className="features-list">
                  <li>
                    <span className="icon_check"></span> Student Record Management
                  </li>
                  <li>
                    <span className="icon_check"></span> Attendance & Performance Tracking
                  </li>
                  <li>
                    <span className="icon_check"></span> Role-Based Access for Admin & Students
                  </li>
                  <li>
                    <span className="icon_check"></span>  Secure & Scalable Architecture
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="row text-center mt-5">
            <div className="col-lg-12">
              <a href="/contact" className="cta-button">
                Get Started & Simplify Student Management Today!
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;