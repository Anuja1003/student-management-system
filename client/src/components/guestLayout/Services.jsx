import React from "react";

const Services = () => {
  return (
    <>
        <style>
        {`
        /* Services Section Styles */
        .services-section {
          padding: 100px 0;
          background: #ffffff;
          position: relative;
          overflow: hidden;
          text-align: center; /* ADD THIS to center all text */
        }

        .services-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 210, 0, 0.05) 0%, transparent 50%);
          z-index: 1;
        }

        .services-section .container {
          max-width: 1200px;
          margin: 0 auto; /* ADD THIS to center container */
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        /* Section Title - ALREADY CENTERED BUT LET'S VERIFY */
        .section-title {
          margin-bottom: 70px;
          text-align: center; /* Ensure this is center */
          position: relative;
        }

        .section-title h2 {
          font-size: 3.2rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #1a1a1a;
          position: relative;
          display: inline-block;
        }

        .section-title h2 span {
          position: relative;
          display: inline-block;
        }

        .section-title h2 span::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 3px;
          transform: scaleX(0.8);
          transform-origin: center;
        }

        .section-title p {
          font-size: 1.25rem;
          color: #666;
          max-width: 600px;
          margin: 30px auto 0; /* auto margins center it */
          line-height: 1.6;
          font-weight: 400;
        }

        /* FIX THE GRID SYSTEM - REPLACE BOOTSTRAP CLASSES */
        /* Remove Bootstrap grid classes and create your own grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          justify-content: center; /* Center grid items */
        }

        .service-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 35px;
          box-shadow: 
            0 10px 30px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
          height: 100%;
          text-align: left; /* Keep card content left-aligned */
        }

        /* Remove all Bootstrap-related grid styles */
        .services-section .row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center; /* Center the cards */
          gap: 30px;
        }

        .services-section .col-lg-4,
        .services-section .col-md-6 {
          flex: 0 0 calc(33.333% - 30px); /* Adjust for gap */
          max-width: calc(33.333% - 30px);
        }

        @media (max-width: 991px) {
          .services-section .col-lg-4,
          .services-section .col-md-6 {
            flex: 0 0 calc(50% - 30px);
            max-width: calc(50% - 30px);
          }
        }

        @media (max-width: 768px) {
          .services-section .col-lg-4,
          .services-section .col-md-6 {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }

        /* Rest of your CSS remains the same */
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transform: translateY(-100%);
          transition: transform 0.4s ease;
        }

        .service-card:hover::before {
          transform: translateY(0);
        }

        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 
            0 25px 50px rgba(102, 126, 234, 0.15),
            0 5px 15px rgba(0, 0, 0, 0.08);
          border-color: rgba(102, 126, 234, 0.2);
        }

        /* Service Icon */
        .service-icon {
          width: 70px;
          height: 70px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 25px;
          font-size: 32px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .service-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 20px;
          transform: scale(0.8);
          transition: transform 0.4s ease;
        }

        /* Color coding for service icons */
        .service-card:nth-child(1) .service-icon {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .service-card:nth-child(2) .service-icon {
          background: linear-gradient(135deg, #ff6b6b, #ff8e53);
          color: white;
        }

        .service-card:nth-child(3) .service-icon {
          background: linear-gradient(135deg, #4cd964, #2193b0);
          color: white;
        }

        .service-card:nth-child(4) .service-icon {
          background: linear-gradient(135deg, #ffd166, #ef476f);
          color: white;
        }

        .service-card:nth-child(5) .service-icon {
          background: linear-gradient(135deg, #118ab2, #06d6a0);
          color: white;
        }

        .service-card:nth-child(6) .service-icon {
          background: linear-gradient(135deg, #8338ec, #3a86ff);
          color: white;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .service-card:hover .service-icon::before {
          transform: scale(1);
        }

        /* Service Content */
        .service-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 15px;
          color: #1a1a1a;
          position: relative;
          padding-bottom: 15px;
          line-height: 1.3;
        }

        .service-card h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: #e2e8f0;
          border-radius: 1px;
          transition: width 0.3s ease, background 0.3s ease;
        }

        .service-card:hover h3::after {
          width: 60px;
          background: #667eea;
        }

        .service-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: #64748b;
          font-weight: 400;
          margin-bottom: 0;
          transition: color 0.3s ease;
        }

        .service-card:hover p {
          color: #4a5568;
        }

        /* Card Number */
        .card-number {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 1.8rem;
          font-weight: 800;
          color: rgba(0, 0, 0, 0.03);
          transition: color 0.3s ease;
          font-family: 'Arial', sans-serif;
        }

        .service-card:hover .card-number {
          color: rgba(102, 126, 234, 0.1);
        }

        /* Learn More Link */
        .learn-more {
          display: inline-block;
          margin-top: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #667eea;
          text-decoration: none;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          position: relative;
          padding-right: 20px;
        }

        .service-card:hover .learn-more {
          opacity: 1;
          transform: translateX(0);
        }

        .learn-more::after {
          content: '→';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          transition: transform 0.3s ease;
        }

        .learn-more:hover::after {
          transform: translate(5px, -50%);
        }

        /* Animation Classes */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeUp 0.8s ease forwards;
        }

        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        .delay-6 { animation-delay: 0.6s; }

        /* Animations */
        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1199px) {
          .section-title h2 {
            font-size: 2.8rem;
          }
          
          .service-card {
            padding: 30px;
          }
          
          .service-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
          }
          
          .service-card h3 {
            font-size: 1.4rem;
          }
        }

        @media (max-width: 991px) {
          .services-section {
            padding: 80px 0;
          }
          
          .section-title h2 {
            font-size: 2.4rem;
          }
          
          .section-title p {
            font-size: 1.1rem;
            padding: 0 20px;
          }
          
          .service-card {
            padding: 25px;
          }
          
          .service-icon {
            width: 55px;
            height: 55px;
            font-size: 26px;
            margin-bottom: 20px;
          }
          
          .service-card h3 {
            font-size: 1.3rem;
          }
          
          .service-card p {
            font-size: 0.95rem;
          }
        }

        @media (max-width: 768px) {
          .services-section {
            padding: 60px 0;
          }
          
          .section-title h2 {
            font-size: 2rem;
          }
          
          .section-title p {
            font-size: 1rem;
            padding: 0 15px;
          }
          
          .service-card {
            padding: 25px 20px;
            border-radius: 16px;
          }
          
          .service-icon {
            width: 50px;
            height: 50px;
            font-size: 24px;
            border-radius: 16px;
          }
          
          .service-card h3 {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 576px) {
          .section-title h2 {
            font-size: 1.8rem;
          }
          
          .service-card {
            padding: 20px;
          }
          
          .service-icon {
            width: 45px;
            height: 45px;
            font-size: 22px;
            border-radius: 14px;
          }
          
          .service-card h3 {
            font-size: 1.1rem;
          }
          
          .service-card p {
            font-size: 0.9rem;
          }
          
          .card-number {
            font-size: 1.5rem;
            top: 15px;
            right: 15px;
          }
        }
        `}
      </style>

      <section className="services-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>Our Services</h2>
                <p>
                  We provide powerful tools to manage students, academics, and
                  institutional data efficiently and securely.
                </p>
              </div>
            </div>
          </div>

          {/* Services Cards */}
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🎓</div>
                <h3>Student Management</h3>
                <p>
                  Manage student profiles, admissions, personal details, and
                  academic records in a centralized system.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">📅</div>
                <h3>Attendance Tracking</h3>
                <p>
                  Track student attendance digitally with accurate records and
                  real-time access for teachers and administrators.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">📊</div>
                <h3>Performance Monitoring</h3>
                <p>
                  Monitor academic performance, grades, and progress reports to
                  support student success.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">👩‍🏫</div>
                <h3>Staff & Faculty Management</h3>
                <p>
                  Manage teachers and staff records, roles, and responsibilities
                  with role-based access control.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">🔐</div>
                <h3>Secure Data Management</h3>
                <p>
                  Ensure student and institutional data is protected with secure
                  authentication and authorization mechanisms.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="service-card">
                <div className="service-icon">📈</div>
                <h3>Reports & Analytics</h3>
                <p>
                  Generate detailed reports and analytics to make informed academic
                  and administrative decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
