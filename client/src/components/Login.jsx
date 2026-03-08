import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      const res = await axios.post("http://localhost:8000/api/users/login", formData
      );

      setMessage({ text: res.data.message, type: "success" });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "admin") {
         localStorage.setItem("adminToken", res.data.token);
        navigate("/admin");
      } else {
        navigate("/user");
      }

      setFormData({ email: "", password: "" });
      setValidated(false);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Login failed ❌",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .login-card {
          border-radius: 20px;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          animation: fadeUp 0.8s ease;
        }

        .login-title {
          font-weight: 700;
          color: #4a90e2;
        }

        .login-subtitle {
          font-size: 15px;
          color: #777;
        }

        .form-control {
          border-radius: 10px;
          padding: 12px;
        }

        .form-control:focus {
          box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
        }

        .login-btn {
          border-radius: 12px;
          padding: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .link {
          color: #4a90e2;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>

      <div className="login-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} lg={5}>
              <Card className="login-card">
                <Card.Body className="p-4">
                  <div className="text-center mb-4">
                    <h2 className="login-title">Student Management System</h2>
                    <p className="login-subtitle">
                      Login to access your dashboard
                    </p>
                  </div>

                  {message && (
                    <Alert variant={message.type}>{message.text}</Alert>
                  )}

                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Password is required.
                      </Form.Control.Feedback>
                      <Form.Text>
                        <a href="/forgot-password" className="link">
                          Forgot password?
                        </a>
                      </Form.Text>
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                        variant="primary"
                        type="submit"
                        size="lg"
                        className="login-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" animation="border" /> Signing In...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </div>
                  </Form>

                  <div className="text-center mt-4">
                    <p className="text-muted mb-0">
                      Don’t have an account?{" "}
                      <a href="/register" className="link">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Login;
