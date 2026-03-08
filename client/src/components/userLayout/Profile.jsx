import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  Badge
} from 'react-bootstrap';
import { 
  PersonCircle, 
  Envelope, 
  Telephone, 
  PersonBadge, 
  PencilSquare,
  CheckCircle,
  XCircle,
  Book,
  Calendar,
  Clock
} from 'react-bootstrap-icons';

const API_BASE = "http://localhost:8000/api/users";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    course: '',
    year: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Course options for dropdown
  const courseOptions = [
    'Master of Computer Application',
    'Master of Business Administrator',
    'Bachelor of Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Computer Science and Engineering',
    'AIDS'
  ];

  // Year options for dropdown
  const yearOptions = ['2024', '2025', '2026'];

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
        contact: res.data.user.contact || '',
        course: res.data.user.course || '',
        year: res.data.user.year || ''
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
        contact: profile.contact || '',
        course: profile.course || '',
        year: profile.year || ''
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
      <Container className="py-5 text-center">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
          <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
          <p className="mt-3 text-muted">Loading your profile...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8} xl={6}>
          <Card className="shadow-lg border-0" style={{ borderRadius: '20px', overflow: 'hidden' }}>
            {/* Header Section with Gradient Background */}
            <div className="bg-primary-gradient py-4 text-white text-center">
              <PersonCircle size={80} className="mb-3" />
              <h2 className="fw-bold mb-0">My Profile</h2>
              <p className="text-white-50 mb-0">Manage your account information</p>
            </div>
            
            <Card.Body className="p-4">
              {/* Status Messages */}
              {error && (
                <Alert variant="danger" className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
                  <XCircle className="me-2" />
                  {error}
                </Alert>
              )}
              {success && (
                <Alert variant="success" className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
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
                  
                  <div className="mb-3">
                    <Form.Label className="fw-semibold text-secondary mb-1">
                      <PersonCircle className="me-2" />
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="py-3 border-2"
                      style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}
                    />
                  </div>

                  <div className="mb-3">
                    <Form.Label className="fw-semibold text-secondary mb-1">
                      <Envelope className="me-2" />
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="py-3 border-2"
                      style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}
                    />
                  </div>

                  <div className="mb-3">
                    <Form.Label className="fw-semibold text-secondary mb-1">
                      <Telephone className="me-2" />
                      Contact Number
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      className="py-3 border-2"
                      style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}
                    />
                  </div>

                  <div className="mb-3">
                    <Form.Label className="fw-semibold text-secondary mb-1">
                      <Book className="me-2" />
                      Course
                    </Form.Label>
                    <Form.Select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="py-3 border-2"
                      style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}
                    >
                      <option value="">Select your course</option>
                      {courseOptions.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="mb-4">
                    <Form.Label className="fw-semibold text-secondary mb-1">
                      <Calendar className="me-2" />
                      Year
                    </Form.Label>
                    <Form.Select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="py-3 border-2"
                      style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}
                    >
                      <option value="">Select your year</option>
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </Form.Select>
                  </div>

                  <div className="d-grid gap-3 mt-4">
                    <Button 
                      variant="primary" 
                      type="submit"
                      className="py-3 fw-bold"
                      style={{ borderRadius: '12px', fontSize: '1.1rem' }}
                    >
                      <CheckCircle className="me-2" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleCancel}
                      className="py-3"
                      style={{ borderRadius: '12px', fontSize: '1.1rem' }}
                    >
                      <XCircle className="me-2" />
                      Cancel
                    </Button>
                  </div>
                </Form>
              ) : (
                profile && (
                  <>
                    {/* Profile Information Cards */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center">
                          <h4 className="fw-bold text-primary mb-0">Profile Information</h4>
                         
                        </div>
                        <Badge bg={profile.role === 'admin' ? 'danger' : 'primary'} className="px-3 py-2">
                          <PersonBadge className="me-2" />
                          {profile.role.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Info Cards */}
                      <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: '15px', background: '#f8f9fa' }}>
                        <Card.Body className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                              <PersonCircle className="text-primary" size={24} />
                            </div>
                            <div>
                              <h6 className="text-muted mb-1">Full Name</h6>
                              <h5 className="fw-bold mb-0">{profile.name}</h5>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: '15px', background: '#f8f9fa' }}>
                        <Card.Body className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-success bg-opacity-10 p-3 rounded-circle me-3">
                              <Envelope className="text-success" size={24} />
                            </div>
                            <div>
                              <h6 className="text-muted mb-1">Email Address</h6>
                              <h5 className="fw-bold mb-0">{profile.email}</h5>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: '15px', background: '#f8f9fa' }}>
                        <Card.Body className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-warning bg-opacity-10 p-3 rounded-circle me-3">
                              <Telephone className="text-warning" size={24} />
                            </div>
                            <div>
                              <h6 className="text-muted mb-1">Contact Number</h6>
                              <h5 className="fw-bold mb-0">{profile.contact || 'Not provided'}</h5>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: '15px', background: '#f8f9fa' }}>
                        <Card.Body className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-info bg-opacity-10 p-3 rounded-circle me-3">
                              <Book className="text-info" size={24} />
                            </div>
                            <div>
                              <h6 className="text-muted mb-1">Course</h6>
                              <h5 className="fw-bold mb-0">{profile.course || 'Not selected'}</h5>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>

                      <Card className="border-0 shadow-sm" style={{ borderRadius: '15px', background: '#f8f9fa' }}>
                        <Card.Body className="py-3">
                          <div className="d-flex align-items-center">
                            <div className="bg-secondary bg-opacity-10 p-3 rounded-circle me-3">
                              <Calendar className="text-secondary" size={24} />
                            </div>
                            <div>
                              <h6 className="text-muted mb-1">Year</h6>
                              <h5 className="fw-bold mb-0">{profile.year || 'Not selected'}</h5>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>

                    {/* Edit Button */}
                    <div className="d-grid mt-4">
                      <Button 
                        variant="primary" 
                        onClick={handleEdit}
                        className="py-3 fw-bold"
                        style={{ 
                          borderRadius: '12px', 
                          fontSize: '1.1rem',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          border: 'none',
                          boxShadow: '0 4px 15px rgba(118, 75, 162, 0.3)'
                        }}
                      >
                        <PencilSquare className="me-2" />
                        Edit Profile
                      </Button>
                    </div>
                  </>
                )
              )}
            </Card.Body>
            
            {/* Footer */}
            <Card.Footer className="bg-light border-0 py-3 text-center">
              <small className="text-muted">
                Last updated: {profile ? new Date(profile.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      <style>{`
        .bg-primary-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .card {
          transition: transform 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-5px);
        }
        
        .info-card {
          transition: all 0.3s ease;
        }
        
        .info-card:hover {
          transform: translateX(5px);
          box-shadow: 0 5px 20px rgba(0,0,0,0.1) !important;
        }
        
        .btn-primary {
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(118, 75, 162, 0.4) !important;
        }
        
        .form-control:focus {
          border-color: #764ba2;
          box-shadow: 0 0 0 0.25rem rgba(118, 75, 162, 0.25);
        }
        
        .form-select:focus {
          border-color: #764ba2;
          box-shadow: 0 0 0 0.25rem rgba(118, 75, 162, 0.25);
        }
        
        .badge {
          border-radius: 10px;
          font-weight: 600;
        }
      `}</style>
    </Container>
  );
};

export default Profile;