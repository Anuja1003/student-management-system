import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert
} from 'react-bootstrap';
import { 
  PersonCircle, 
  Envelope, 
  Telephone, 
  PersonBadge, 
  PencilSquare,
  CheckCircle,
  XCircle 
} from 'react-bootstrap-icons';

const API_BASE = "http://localhost:8000/api/users";

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser) {
        setError('Please login first');
        setLoading(false);
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const res = await axios.get(`${API_BASE}/profile`, config);
      setProfile(res.data.user);
      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
        contact: res.data.user.contact
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    // Reset form data to current profile
    if (profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        contact: profile.contact || ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const res = await axios.put(`${API_BASE}/profile`, formData, config);
      setProfile(res.data.user);
      setSuccess('Profile updated successfully ✅');
      setIsEditing(false);
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        localStorage.setItem('user', JSON.stringify({
          ...storedUser,
          ...res.data.user
        }));
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Container className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your profile...</p>
        </Container>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
        /* Page Container */
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 100px 20px 50px; /* Space for navbar */
          position: relative;
        }

        .profile-page::before {
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

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          position: relative;
          z-index: 2;
        }

        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid #f0f2f5;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 25px;
        }

        .loading-text {
          color: #718096;
          font-size: 1.2rem;
          font-weight: 500;
        }

        /* Profile Card */
        .profile-card {
          background: white;
          border-radius: 25px;
          border: none;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          overflow: hidden;
          position: relative;
          z-index: 2;
          animation: fadeIn 0.6s ease;
        }

        .profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #667eea, #764ba2, #ffd200);
        }

        /* Card Header */
        .card-header {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          text-align: center;
          padding: 50px 40px;
          position: relative;
          overflow: hidden;
        }

        .profile-icon {
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 25px;
          font-size: 48px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .profile-icon:hover {
          transform: scale(1.1) rotate(10deg);
        }

        .profile-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 10px;
          color: white;
        }

        .profile-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
        }

        /* Role Badge */
        .role-badge {
          position: absolute;
          top: 30px;
          right: 30px;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px 20px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Card Body */
        .card-body {
          padding: 40px;
        }

        /* Alert Styles */
        .alert {
          border-radius: 15px;
          border: none;
          padding: 15px 20px;
          margin-bottom: 30px;
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

        /* Profile Info Cards */
        .info-card {
          background: #f8fafc;
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 20px;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-3px);
          border-color: rgba(102, 126, 234, 0.2);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20px;
          font-size: 24px;
          flex-shrink: 0;
        }

        .info-icon-name {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          color: #667eea;
        }

        .info-icon-email {
          background: linear-gradient(135deg, rgba(76, 217, 100, 0.1), rgba(46, 204, 113, 0.1));
          color: #4cd964;
        }

        .info-icon-contact {
          background: linear-gradient(135deg, rgba(255, 210, 0, 0.1), rgba(255, 166, 0, 0.1));
          color: #ffd200;
        }

        .info-label {
          color: #718096;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 5px;
        }

        .info-value {
          color: #2c3e50;
          font-size: 1.2rem;
          font-weight: 600;
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 600;
          color: #2c3e50;
          font-size: 0.95rem;
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
        }

        .form-control:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
          background: white;
          outline: none;
        }

        /* Button Styles */
        .action-buttons {
          display: flex;
          gap: 15px;
          margin-top: 30px;
        }

        .btn-primary {
          padding: 16px 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 15px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .btn-secondary {
          padding: 16px 30px;
          background: linear-gradient(135deg, #718096, #4a5568);
          border: none;
          border-radius: 15px;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(113, 128, 150, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-secondary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(113, 128, 150, 0.4);
        }

        /* Footer */
        .card-footer {
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          padding: 20px 40px;
          text-align: center;
          color: #718096;
          font-size: 0.9rem;
        }

        /* Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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

        /* Responsive Design */
        @media (max-width: 992px) {
          .profile-page {
            padding: 90px 15px 40px;
          }
          
          .card-header {
            padding: 40px 30px;
          }
          
          .profile-title {
            font-size: 2.2rem;
          }
          
          .card-body {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .profile-page {
            padding: 80px 15px 30px;
          }
          
          .profile-title {
            font-size: 2rem;
          }
          
          .profile-icon {
            width: 80px;
            height: 80px;
            font-size: 40px;
          }
          
          .role-badge {
            position: static;
            display: inline-block;
            margin-bottom: 20px;
          }
          
          .action-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 576px) {
          .profile-page {
            padding: 70px 10px 25px;
          }
          
          .card-header {
            padding: 30px 20px;
          }
          
          .profile-title {
            font-size: 1.8rem;
          }
          
          .card-body {
            padding: 25px 20px;
          }
          
          .info-card {
            padding: 20px;
          }
          
          .btn-primary,
          .btn-secondary {
            padding: 14px 25px;
            font-size: 1rem;
          }
        }
        `}
      </style>

      <div className="profile-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} lg={8} xl={6}>
              <Card className="profile-card">
                {/* Header */}
                <div className="card-header">
                  <div className="profile-icon">
                    <PersonCircle />
                  </div>
                  <h1 className="profile-title">My Profile</h1>
                  <p className="profile-subtitle">Manage your account information</p>
                  {profile && (
                    <div className="role-badge">
                      <PersonBadge className="me-2" />
                      {profile.role.toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Body */}
                <div className="card-body">
                  {/* Status Messages */}
                  {error && (
                    <Alert variant="danger" className="alert-danger">
                      <XCircle className="me-2" />
                      {error}
                    </Alert>
                  )}
                  
                  {success && (
                    <Alert variant="success" className="alert-success">
                      <CheckCircle className="me-2" />
                      {success}
                    </Alert>
                  )}

                  {isEditing ? (
                    <Form onSubmit={handleSubmit}>
                      <h4 className="fw-bold mb-4 text-primary">
                        <PencilSquare className="me-2" />
                        Edit Profile
                      </h4>
                      
                      <div className="form-group">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="form-group">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="Enter your email address"
                        />
                      </div>

                      <div className="form-group">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="contact"
                          value={formData.contact}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder="Enter your contact number"
                        />
                      </div>

                      <div className="action-buttons">
                        <Button 
                          variant="primary" 
                          type="submit"
                          className="btn-primary"
                        >
                          <CheckCircle />
                          Save Changes
                        </Button>
                        <Button 
                          variant="secondary" 
                          onClick={handleCancel}
                          className="btn-secondary"
                        >
                          <XCircle />
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    profile && (
                      <>
                        <div className="mb-4">
                          <h4 className="fw-bold mb-4 text-primary">
                            Profile Information
                          </h4>

                          {/* Name Card */}
                          <div className="info-card">
                            <div className="d-flex align-items-center">
                              <div className="info-icon info-icon-name">
                                <PersonCircle />
                              </div>
                              <div>
                                <div className="info-label">Full Name</div>
                                <div className="info-value">{profile.name}</div>
                              </div>
                            </div>
                          </div>

                          {/* Email Card */}
                          <div className="info-card">
                            <div className="d-flex align-items-center">
                              <div className="info-icon info-icon-email">
                                <Envelope />
                              </div>
                              <div>
                                <div className="info-label">Email Address</div>
                                <div className="info-value">{profile.email}</div>
                              </div>
                            </div>
                          </div>

                          {/* Contact Card */}
                          <div className="info-card">
                            <div className="d-flex align-items-center">
                              <div className="info-icon info-icon-contact">
                                <Telephone />
                              </div>
                              <div>
                                <div className="info-label">Contact Number</div>
                                <div className="info-value">{profile.contact || 'Not provided'}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Edit Button */}
                        <div className="text-center mt-4">
                          <Button 
                            variant="primary" 
                            onClick={handleEdit}
                            className="btn-primary"
                          >
                            <PencilSquare className="me-2" />
                            Edit Profile
                          </Button>
                        </div>
                      </>
                    )
                  )}
                </div>
                
                {/* Footer */}
                <div className="card-footer">
                  Last updated: {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AdminProfile;