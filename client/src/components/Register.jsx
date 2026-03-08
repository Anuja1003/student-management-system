import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    //contact: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/users/register", formData);
      setMessage({ text: res.data.message, type: "success" });
      setFormData({ name: "", email: "", password: "" });
      setValidated(false);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong ",
        type: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
        /* Page Background */
        .register-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 50px; /* Increased top padding to account for navbar */
          position: relative;
          overflow: hidden;
        }

        .register-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 210, 0, 0.05) 0%, transparent 50%);
          z-index: 1;
        }

        /* Registration Card */
        .register-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 25px;
          border: none;
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(20px);
          overflow: hidden;
          position: relative;
          z-index: 2;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-top: 50px; /* Added margin to push card down */
        }

        .register-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 40px 80px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(255, 255, 255, 0.3);
        }

        .register-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #667eea, #764ba2, #ffd200);
          border-radius: 25px 25px 0 0;
        }

        /* Header Section */
        .register-header {
          text-align: center;
          padding: 40px 40px 30px; /* Increased padding */
          position: relative;
        }

        .register-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          color: white;
          font-size: 32px;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          transition: all 0.3s ease;
        }

        .register-icon:hover {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }

        .register-title {
          font-size: 2.2rem;
          font-weight: 800;
          color: #2c3e50;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .register-subtitle {
          color: #718096;
          font-size: 1.1rem;
          font-weight: 400;
          line-height: 1.5;
        }

        /* Form Styles */
        .register-form {
          padding: 0 40px 40px;
        }

        .form-group {
          margin-bottom: 25px;
          position: relative;
        }

        .form-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .form-control {
          width: 100%;
          padding: 18px 20px;
          border: 2px solid #e2e8f0;
          border-radius: 15px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #f8fafc;
          color: #2d3748;
          font-family: inherit;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 
            inset 0 2px 4px rgba(0, 0, 0, 0.05),
            0 0 0 3px rgba(102, 126, 234, 0.2);
          background: white;
          outline: none;
        }

        .form-control:hover {
          border-color: #cbd5e0;
        }

        .form-control.is-invalid {
          border-color: #ff6b6b;
          background: rgba(255, 107, 107, 0.05);
        }

        .form-control.is-valid {
          border-color: #4cd964;
          background: rgba(76, 217, 100, 0.05);
        }

        /* Input Icons */
        .input-icon {
          position: absolute;
          right: 20px;
          top: 45px;
          color: #a0aec0;
          font-size: 1.1rem;
          transition: color 0.3s ease;
        }

        .form-control:focus + .input-icon {
          color: #667eea;
        }

        /* Submit Button */
        .submit-btn {
          display: block;
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-weight: 600;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
          margin-top: 10px;
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
          transform: translateY(-3px);
          box-shadow: 
            0 15px 30px rgba(102, 126, 234, 0.4),
            0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .submit-btn:active {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        /* Loading Animation */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
        }

        /* Alert Styles */
        .alert {
          border-radius: 15px;
          border: none;
          padding: 15px 20px;
          margin-bottom: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Link Styles */
        .login-link {
          text-align: center;
          margin-top: 25px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
        }

        .login-link a {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          padding-bottom: 2px;
        }

        .login-link a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }

        .login-link a:hover {
          color: #764ba2;
        }

        .login-link a:hover::after {
          width: 100%;
        }

        /* Form Text */
        .form-text {
          font-size: 0.85rem;
          color: #718096;
          margin-top: 8px;
          padding-left: 5px;
        }

        /* Page Container */
        .page-container {
          width: 100%;
          max-width: 550px;
          margin: 0 auto;
          position: relative;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .register-page {
            padding: 90px 15px 40px; /* Adjusted for mobile */
          }
          
          .register-header {
            padding: 30px 25px 20px;
          }
          
          .register-form {
            padding: 0 25px 30px;
          }
          
          .register-title {
            font-size: 1.8rem;
          }
          
          .register-subtitle {
            font-size: 1rem;
          }
          
          .register-icon {
            width: 70px;
            height: 70px;
            font-size: 28px;
          }
          
          .form-control {
            padding: 16px;
          }
          
          .submit-btn {
            padding: 16px;
          }
          
          .register-card {
            margin-top: 30px;
          }
        }

        @media (max-width: 576px) {
          .register-page {
            padding: 80px 15px 30px; /* Further adjustment for small screens */
          }
          
          .register-header {
            padding: 25px 20px 15px;
          }
          
          .register-form {
            padding: 0 20px 25px;
          }
          
          .register-title {
            font-size: 1.6rem;
          }
          
          .register-subtitle {
            font-size: 0.95rem;
          }
          
          .register-icon {
            width: 60px;
            height: 60px;
            font-size: 24px;
          }
          
          .form-control {
            padding: 14px;
            font-size: 0.95rem;
          }
          
          .form-label {
            font-size: 0.9rem;
          }
          
          .register-card {
            margin-top: 20px;
          }
        }

        /* Animation for card entrance */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .register-card {
          animation: fadeInUp 0.6s ease;
        }
        `}
      </style>

      <div className="register-page">
        <div className="page-container">
          <Card className="register-card">
            <Card.Body>
              <div className="register-header">
                <div className="register-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h2 className="register-title">Create Account</h2>
                <p className="register-subtitle">
                  Please fill in your details to register for Student Management
                </p>
              </div>
              
              {message && (
                <Alert variant={message.type} className="text-center">
                  {message.text}
                </Alert>
              )}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="register-form">
                <Form.Group className="form-group">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  <i className="fas fa-user input-icon"></i>
                  <Form.Control.Feedback type="invalid">
                    Please provide your name
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="form-group">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  <i className="fas fa-envelope input-icon"></i>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email address
                  </Form.Control.Feedback>
                </Form.Group>
                
                {/*<Form.Group className="form-group">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="contact"
                    placeholder="Enter your contact number"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                  <i className="fas fa-phone input-icon"></i>
                  <Form.Control.Feedback type="invalid">
                    Please provide your contact number
                  </Form.Control.Feedback>
                </Form.Group>*/}
                
                <Form.Group className="form-group">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="form-control"
                  />
                  <i className="fas fa-lock input-icon"></i>
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 6 characters
                  </Form.Control.Feedback>
                  <Form.Text className="form-text">
                    Must be at least 6 characters long for security
                  </Form.Text>
                </Form.Group>
                
                <Button
                  variant="primary"
                  type="submit"
                  className="submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner"></span>
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </Form>
              
              <div className="login-link">
                <p className="text-muted">
                  Already have an account?{' '}
                  <a href="/login" className="text-decoration-none">
                    Sign in here
                  </a>
                </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;