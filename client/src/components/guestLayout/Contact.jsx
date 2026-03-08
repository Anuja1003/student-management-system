import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Form submitted! We'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <style>
        {`
        /* Contact Section Styles */
        .contact-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          position: relative;
          overflow: hidden;
        }

        .contact-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 10% 20%, rgba(102, 126, 234, 0.05) 0%, transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(255, 210, 0, 0.05) 0%, transparent 40%);
          z-index: 1;
        }

        .contact-section .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        /* Section Title */
        .section-title {
          margin-bottom: 70px;
          text-align: center;
        }

        .section-title h2 {
          font-size: 3.2rem;
          font-weight: 800;
          margin-bottom: 20px;
          color: #1a1a1a;
          position: relative;
          display: inline-block;
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
          font-size: 1.25rem;
          color: #666;
          max-width: 700px;
          margin: 30px auto 0;
          line-height: 1.6;
          font-weight: 400;
        }

        /* Contact Form */
        .contact-form {
          background: white;
          border-radius: 25px;
          padding: 50px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.08),
            0 8px 16px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .contact-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #667eea, #764ba2, #ffd200);
          border-radius: 25px 25px 0 0;
        }

        .contact-form:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 30px 60px rgba(102, 126, 234, 0.15),
            0 15px 35px rgba(0, 0, 0, 0.1);
        }

        /* Form Groups */
        .form-group {
          margin-bottom: 30px;
          position: relative;
        }

        .form-group label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #2c3e50;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        .form-control {
          width: 100%;
          padding: 18px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8fafc;
          color: #2d3748;
          font-family: inherit;
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          background: white;
          outline: none;
        }

        .form-control:hover {
          border-color: #cbd5e0;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 150px;
          line-height: 1.5;
        }

        /* Floating Label Effect */
        .form-control:focus + .floating-label,
        .form-control:not(:placeholder-shown) + .floating-label {
          transform: translateY(-35px) scale(0.9);
          color: #667eea;
          font-weight: 600;
        }

        /* Submit Button */
        .submit-btn {
          display: inline-block;
          padding: 18px 45px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 15px 30px rgba(102, 126, 234, 0.4),
            0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .submit-btn:active {
          transform: translateY(0) scale(0.98);
        }

        /* Contact Info */
        .contact-info {
          margin-top: 60px;
          background: white;
          border-radius: 25px;
          padding: 40px;
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.08),
            0 8px 16px rgba(0, 0, 0, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .contact-info h3 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 30px;
          color: #2c3e50;
          text-align: center;
          position: relative;
          padding-bottom: 15px;
        }

        .contact-info h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 1.5px;
        }

        .contact-details {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
        }

        .contact-details li {
          background: #f8fafc;
          border-radius: 16px;
          padding: 25px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .contact-details li:hover {
          transform: translateY(-5px);
          border-color: rgba(102, 126, 234, 0.2);
          background: white;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .contact-details li .icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-right: 20px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .contact-details li:hover .icon {
          transform: scale(1.1) rotate(5deg);
        }

        .contact-details li .icon-text {
          flex: 1;
        }

        .contact-details li strong {
          display: block;
          font-size: 1.1rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .contact-details li span {
          font-size: 1rem;
          color: #64748b;
          font-weight: 400;
        }

        /* Animation Classes */
        .fade-in {
          opacity: 0;
          animation: fadeIn 1s ease forwards;
        }

        .slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.8s ease forwards;
        }

        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }

        /* Animations */
        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Form Row */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        /* Responsive Design */
        @media (max-width: 1199px) {
          .section-title h2 {
            font-size: 2.8rem;
          }
          
          .contact-form {
            padding: 40px;
          }
        }

        @media (max-width: 991px) {
          .contact-section {
            padding: 80px 0;
          }
          
          .section-title h2 {
            font-size: 2.4rem;
          }
          
          .section-title p {
            font-size: 1.1rem;
            padding: 0 20px;
          }
          
          .contact-form {
            padding: 35px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 25px;
          }
          
          .form-control {
            padding: 16px 18px;
          }
          
          .submit-btn {
            padding: 16px 35px;
            font-size: 1rem;
          }
          
          .contact-info {
            padding: 35px;
          }
          
          .contact-details {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 60px 0;
          }
          
          .section-title h2 {
            font-size: 2rem;
          }
          
          .section-title p {
            font-size: 1rem;
            padding: 0 15px;
          }
          
          .contact-form {
            padding: 30px 25px;
            border-radius: 20px;
          }
          
          .form-group {
            margin-bottom: 25px;
          }
          
          .form-control {
            padding: 15px;
            border-radius: 10px;
          }
          
          .submit-btn {
            padding: 15px 30px;
            font-size: 1rem;
            width: 100%;
          }
          
          .contact-info {
            padding: 30px 25px;
            border-radius: 20px;
          }
          
          .contact-details li {
            padding: 20px;
          }
          
          .contact-details li .icon {
            width: 45px;
            height: 45px;
            font-size: 20px;
            margin-right: 15px;
          }
        }

        @media (max-width: 576px) {
          .section-title h2 {
            font-size: 1.8rem;
          }
          
          .contact-form {
            padding: 25px 20px;
          }
          
          .form-control {
            padding: 14px;
            font-size: 0.95rem;
          }
          
          .contact-info {
            padding: 25px 20px;
          }
          
          .contact-details li {
            padding: 18px;
          }
          
          .contact-details li .icon {
            width: 40px;
            height: 40px;
            font-size: 18px;
            margin-right: 12px;
          }
        }
        `}
      </style>

      <section className="contact-section spad">
        <div className="container">
          {/* Section Title */}
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center">
                <h2>Contact Us</h2>
                <p>
                  Have questions or want to discuss your event? Get in touch with
                  our team today!
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>

              {/* Contact Info */}
              <div className="contact-info text-center">
                <h3>Other Ways to Reach Us</h3>
                <ul className="contact-details">
                  <li>
                    <span className="icon">📧</span> info@eventpro.com
                  </li>
                  <li>
                    <span className="icon">📞</span> +1 (555) 123-4567
                  </li>
                  <li>
                    <span className="icon">📍</span> 123 Event Street, City, State 12345
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;