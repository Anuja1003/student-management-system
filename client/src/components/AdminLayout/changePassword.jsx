import React from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from "react-bootstrap";

const API_BASE = "http://localhost:8000/api/users";

export default class ChangeAdminPassword extends React.Component {
  state = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loading: false,
    error: "",
    success: "",
  };

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: "", success: "" });

    const { currentPassword, newPassword, confirmPassword } = this.state;

    // Get email from localStorage
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const email = parsedUser?.email;

    if (!email) {
      return this.setState({ error: "Could not determine your email. Please sign in and try again." });
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return this.setState({ error: "Please fill all required fields." });
    }

    if (newPassword.length < 6) {
      return this.setState({ error: "New password should be at least 6 characters." });
    }

    if (newPassword !== confirmPassword) {
      return this.setState({ error: "New password and confirmation do not match." });
    }

    this.setState({ loading: true });

    try {
      const payload = { email, currentPassword, newPassword };

      // Optional: send auth token if using JWT
      const token = localStorage.getItem("token"); 
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axios.post(`${API_BASE}/changePassword`, payload, { headers });

      this.setState({
        success: res.data?.message || "Password changed successfully ✅",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      // Capture backend message or fallback
      const msg = err?.response?.data?.message || err?.message || "Failed to change password. Try again.";
      this.setState({ error: msg });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { currentPassword, newPassword, confirmPassword, loading, error, success } = this.state;

    return (
      <>
        <style>
          {`
          /* Page Container */
          .changePassword-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 100px 20px 50px; /* Add space for navbar */
            position: relative;
            overflow: hidden;
          }

          .changePassword-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 210, 0, 0.03) 0%, transparent 50%);
            z-index: 1;
          }

          /* Card Container */
          .password-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 25px;
            border: none;
            box-shadow: 
              0 25px 50px rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(20px);
            overflow: hidden;
            position: relative;
            z-index: 2;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            margin-top: 20px;
          }

          .password-card:hover {
            transform: translateY(-5px);
            box-shadow: 
              0 35px 70px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.3);
          }

          .password-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea, #764ba2, #ffd200);
            border-radius: 25px 25px 0 0;
          }

          /* Card Header */
          .card-header {
            text-align: center;
            padding: 40px 40px 30px;
            position: relative;
          }

          .password-icon {
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
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
          }

          .password-icon:hover {
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
          }

          .password-title {
            font-size: 2rem;
            font-weight: 800;
            color: #2c3e50;
            margin-bottom: 10px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .password-subtitle {
            color: #718096;
            font-size: 1rem;
            font-weight: 400;
          }

          /* Form Styles */
          .password-form {
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
            padding: 16px 20px;
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

          /* Password Strength Indicator */
          .password-strength {
            margin-top: 8px;
            height: 4px;
            background: #e2e8f0;
            border-radius: 2px;
            overflow: hidden;
          }

          .strength-bar {
            height: 100%;
            width: 0;
            border-radius: 2px;
            transition: all 0.3s ease;
          }

          .strength-weak { 
            width: 33%; 
            background: linear-gradient(90deg, #ff6b6b, #ff8e53); 
          }
          .strength-medium { 
            width: 66%; 
            background: linear-gradient(90deg, #ffd166, #f9c74f); 
          }
          .strength-strong { 
            width: 100%; 
            background: linear-gradient(90deg, #4cd964, #2ecc71); 
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

          .alert-success {
            background: linear-gradient(135deg, rgba(76, 217, 100, 0.1), rgba(46, 204, 113, 0.1));
            border: 1px solid rgba(76, 217, 100, 0.2);
            color: #155724;
          }

          .alert-danger {
            background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 71, 87, 0.1));
            border: 1px solid rgba(255, 107, 107, 0.2);
            color: #721c24;
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
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
            margin-top: 20px;
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

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 
              0 15px 35px rgba(102, 126, 234, 0.4),
              0 5px 15px rgba(0, 0, 0, 0.1);
          }

          .submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          /* Loading Spinner */
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

          /* Password Tips */
          .password-tips {
            background: rgba(102, 126, 234, 0.05);
            border-radius: 15px;
            padding: 20px;
            margin-top: 30px;
            border-left: 4px solid #667eea;
          }

          .password-tips h6 {
            color: #2c3e50;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .password-tips ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .password-tips li {
            color: #718096;
            font-size: 0.9rem;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .password-tips li::before {
            content: '✓';
            color: #4cd964;
            font-weight: bold;
          }

          /* Animations */
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
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

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .password-card {
            animation: fadeIn 0.6s ease;
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .changePassword-page {
              padding: 90px 15px 40px;
            }
            
            .card-header {
              padding: 30px 25px 20px;
            }
            
            .password-form {
              padding: 0 25px 30px;
            }
            
            .password-title {
              font-size: 1.8rem;
            }
            
            .password-icon {
              width: 70px;
              height: 70px;
              font-size: 28px;
            }
            
            .form-control {
              padding: 14px;
            }
            
            .submit-btn {
              padding: 16px;
            }
          }

          @media (max-width: 576px) {
            .changePassword-page {
              padding: 80px 15px 30px;
            }
            
            .card-header {
              padding: 25px 20px 15px;
            }
            
            .password-form {
              padding: 0 20px 25px;
            }
            
            .password-title {
              font-size: 1.6rem;
            }
            
            .password-icon {
              width: 60px;
              height: 60px;
              font-size: 24px;
            }
            
            .form-control {
              padding: 12px;
              font-size: 0.95rem;
            }
            
            .form-label {
              font-size: 0.9rem;
            }
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
          `}
        </style>

        <div className="changePassword-page">
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={10} lg={8} xl={6}>
                <Card className="password-card">
                  <Card.Body>
                    <div className="card-header">
                      <div className="password-icon">
                        <i className="fas fa-key"></i>
                      </div>
                      <h2 className="password-title">Change Password</h2>
                      <p className="password-subtitle">
                        Update your password to keep your account secure
                      </p>
                    </div>
                    
                    {success && (
                      <Alert variant="success" className="alert-success">
                        <i className="fas fa-check-circle me-2"></i>
                        {success}
                      </Alert>
                    )}
                    
                    {error && (
                      <Alert variant="danger" className="alert-danger">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {error}
                      </Alert>
                    )}

                    <Form onSubmit={this.handleSubmit} className="password-form">
                      <Form.Group controlId="cpCurrent" className="form-group">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          name="currentPassword"
                          type="password"
                          placeholder="Enter your current password"
                          value={currentPassword}
                          onChange={this.handleChange}
                          required
                          className="form-control"
                        />
                        <i className="fas fa-lock input-icon"></i>
                      </Form.Group>

                      <Row>
                        <Col xs={12} md={6} className="form-group">
                          <Form.Label>New Password</Form.Label>
                          <Form.Control
                            name="newPassword"
                            type="password"
                            placeholder="New password (min 6 characters)"
                            value={newPassword}
                            onChange={this.handleChange}
                            required
                            className="form-control"
                          />
                          <i className="fas fa-key input-icon"></i>
                          <div className="password-strength">
                            <div className={`strength-bar ${newPassword.length < 3 ? 'strength-weak' : newPassword.length < 6 ? 'strength-medium' : 'strength-strong'}`}></div>
                          </div>
                        </Col>

                        <Col xs={12} md={6} className="form-group">
                          <Form.Label>Confirm New Password</Form.Label>
                          <Form.Control
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your new password"
                            value={confirmPassword}
                            onChange={this.handleChange}
                            required
                            className="form-control"
                          />
                          <i className="fas fa-redo input-icon"></i>
                          {confirmPassword && newPassword === confirmPassword && newPassword.length >= 6 && (
                            <div className="mt-2">
                              <small className="text-success">
                                <i className="fas fa-check"></i> Passwords match
                              </small>
                            </div>
                          )}
                        </Col>
                      </Row>

                      <div className="password-tips">
                        <h6>Password Requirements:</h6>
                        <ul>
                          <li>At least 6 characters long</li>
                          <li>Different from your current password</li>
                          <li>Not easily guessable</li>
                          <li>Contains letters and numbers</li>
                        </ul>
                      </div>

                      <Button
                        variant="primary"
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span className="loading-spinner"></span>
                            Updating Password...
                          </>
                        ) : (
                          'Change Password'
                        )}
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}