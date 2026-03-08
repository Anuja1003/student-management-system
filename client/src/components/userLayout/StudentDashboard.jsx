import React, { useState, useEffect } from 'react';
//import { userApiService } from './userservices/userapi';

const StudentDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('Semester 1');
  const [activeTab, setActiveTab] = useState('subjects');

  // Course-wise subject mapping
  const courseSubjects = {
    'Master of Computer Application': {
      'Semester 1': [
        { code: 'MCA101', name: 'Programming in C', credits: 4, type: 'Theory' },
        { code: 'MCA102', name: 'Discrete Mathematics', credits: 4, type: 'Theory' },
        { code: 'MCA103', name: 'Computer Organization', credits: 3, type: 'Theory' },
        { code: 'MCA104', name: 'Digital Electronics', credits: 3, type: 'Theory' },
        { code: 'MCA105', name: 'C Programming Lab', credits: 2, type: 'Practical' }
      ],
      'Semester 2': [
        { code: 'MCA201', name: 'Data Structures', credits: 4, type: 'Theory' },
        { code: 'MCA202', name: 'Object Oriented Programming', credits: 4, type: 'Theory' },
        { code: 'MCA203', name: 'Database Management Systems', credits: 4, type: 'Theory' },
        { code: 'MCA204', name: 'Operating Systems', credits: 3, type: 'Theory' },
        { code: 'MCA205', name: 'Data Structures Lab', credits: 2, type: 'Practical' }
      ],
      'Semester 3': [
        { code: 'MCA301', name: 'Computer Networks', credits: 4, type: 'Theory' },
        { code: 'MCA302', name: 'Software Engineering', credits: 4, type: 'Theory' },
        { code: 'MCA303', name: 'Web Technologies', credits: 4, type: 'Theory' },
        { code: 'MCA304', name: 'Java Programming', credits: 3, type: 'Theory' },
        { code: 'MCA305', name: 'Web Technologies Lab', credits: 2, type: 'Practical' }
      ]
    },
    'Master of Business Administrator': {
      'Semester 1': [
        { code: 'MBA101', name: 'Principles of Management', credits: 4, type: 'Theory' },
        { code: 'MBA102', name: 'Business Economics', credits: 4, type: 'Theory' },
        { code: 'MBA103', name: 'Financial Accounting', credits: 3, type: 'Theory' },
        { code: 'MBA104', name: 'Business Mathematics', credits: 3, type: 'Theory' },
        { code: 'MBA105', name: 'Business Communication', credits: 2, type: 'Practical' }
      ],
      'Semester 2': [
        { code: 'MBA201', name: 'Marketing Management', credits: 4, type: 'Theory' },
        { code: 'MBA202', name: 'Human Resource Management', credits: 4, type: 'Theory' },
        { code: 'MBA203', name: 'Financial Management', credits: 4, type: 'Theory' },
        { code: 'MBA204', name: 'Operations Management', credits: 3, type: 'Theory' },
        { code: 'MBA205', name: 'Marketing Research Lab', credits: 2, type: 'Practical' }
      ]
    },
    'Computer Science and Engineering': {
      'Semester 1': [
        { code: 'CSE101', name: 'Engineering Mathematics-I', credits: 4, type: 'Theory' },
        { code: 'CSE102', name: 'Engineering Physics', credits: 4, type: 'Theory' },
        { code: 'CSE103', name: 'Basic Electrical Engineering', credits: 3, type: 'Theory' },
        { code: 'CSE104', name: 'Programming for Problem Solving', credits: 3, type: 'Theory' },
        { code: 'CSE105', name: 'Engineering Physics Lab', credits: 2, type: 'Practical' }
      ],
      'Semester 2': [
        { code: 'CSE201', name: 'Engineering Mathematics-II', credits: 4, type: 'Theory' },
        { code: 'CSE202', name: 'Engineering Chemistry', credits: 4, type: 'Theory' },
        { code: 'CSE203', name: 'Data Structures', credits: 4, type: 'Theory' },
        { code: 'CSE204', name: 'Digital Logic Design', credits: 3, type: 'Theory' },
        { code: 'CSE205', name: 'Data Structures Lab', credits: 2, type: 'Practical' }
      ]
    },
    'Mechanical Engineering': {
      'Semester 1': [
        { code: 'ME101', name: 'Engineering Mathematics-I', credits: 4, type: 'Theory' },
        { code: 'ME102', name: 'Engineering Physics', credits: 4, type: 'Theory' },
        { code: 'ME103', name: 'Engineering Mechanics', credits: 3, type: 'Theory' },
        { code: 'ME104', name: 'Engineering Graphics', credits: 3, type: 'Theory' },
        { code: 'ME105', name: 'Workshop Practice', credits: 2, type: 'Practical' }
      ]
    },
    'Civil Engineering': {
      'Semester 1': [
        { code: 'CE101', name: 'Engineering Mathematics-I', credits: 4, type: 'Theory' },
        { code: 'CE102', name: 'Engineering Physics', credits: 4, type: 'Theory' },
        { code: 'CE103', name: 'Engineering Mechanics', credits: 3, type: 'Theory' },
        { code: 'CE104', name: 'Civil Engineering Materials', credits: 3, type: 'Theory' },
        { code: 'CE105', name: 'Surveying Lab', credits: 2, type: 'Practical' }
      ]
    },
    'AIDS': {
      'Semester 1': [
        { code: 'AIDS101', name: 'Mathematics for AI', credits: 4, type: 'Theory' },
        { code: 'AIDS102', name: 'Python Programming', credits: 4, type: 'Theory' },
        { code: 'AIDS103', name: 'Data Structures & Algorithms', credits: 3, type: 'Theory' },
        { code: 'AIDS104', name: 'Digital Electronics', credits: 3, type: 'Theory' },
        { code: 'AIDS105', name: 'Python Programming Lab', credits: 2, type: 'Practical' }
      ]
    }
  };

  // Mock grades data (In real app, this would come from API)
  const mockGrades = [
    { subjectCode: 'MCA101', subjectName: 'Programming in C', grade: 'A+', credits: 4, semester: 'Semester 1' },
    { subjectCode: 'MCA102', subjectName: 'Discrete Mathematics', grade: 'A', credits: 4, semester: 'Semester 1' },
    { subjectCode: 'MCA103', subjectName: 'Computer Organization', grade: 'B+', credits: 3, semester: 'Semester 1' },
    { subjectCode: 'MCA201', subjectName: 'Data Structures', grade: 'A', credits: 4, semester: 'Semester 2' },
    { subjectCode: 'MCA202', subjectName: 'Object Oriented Programming', grade: 'A+', credits: 4, semester: 'Semester 2' }
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      
      // Fetch user profile using your existing API
      const response = await fetch('http://localhost:8000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Failed to fetch user profile');
      
      const data = await response.json();
      setUserProfile(data.user);
      
      // Set subjects based on user's course
      if (data.user.course && courseSubjects[data.user.course]) {
        setSubjects(courseSubjects[data.user.course][selectedSemester] || []);
      }
      
      // Set grades (in real app, fetch from API)
      setGrades(mockGrades);
      
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    if (userProfile?.course && courseSubjects[userProfile.course]) {
      setSubjects(courseSubjects[userProfile.course][semester] || []);
    }
  };

  const calculateGPA = () => {
    if (grades.length === 0) return 'N/A';
    
    const gradePoints = {
      'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
    };
    
    let totalCredits = 0;
    let totalPoints = 0;
    
    grades.forEach(grade => {
      const points = gradePoints[grade.grade] || 0;
      totalPoints += points * grade.credits;
      totalCredits += grade.credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  const getAvailableSemesters = () => {
    if (!userProfile?.course || !courseSubjects[userProfile.course]) {
      return ['Semester 1'];
    }
    return Object.keys(courseSubjects[userProfile.course]);
  };

  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Error Loading Dashboard</h3>
          <p className="error-message">{error}</p>
          <button 
            className="retry-btn"
            onClick={fetchUserProfile}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>
        {`
        /* Page Container with spacing for navbar */
        .page-container {
          padding-top: 90px;
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 40px;
          min-height: calc(100vh - 90px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        /* Main Dashboard Container */
        .dashboard-container {
          background: #ffffff;
          border-radius: 20px;
          padding: 35px 40px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
          max-width: 1400px;
          min-height: 500px;
          animation: fadeIn 0.6s ease;
        }

        /* Header Styles */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 25px;
          border-bottom: 2px solid #f0f2f5;
        }

        .dashboard-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
        }

        .dashboard-title span {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .user-info-card {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 20px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .user-name {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .user-detail {
          font-size: 0.95rem;
          opacity: 0.9;
          margin-bottom: 3px;
        }

        /* CHANGED: Added result-card style */
        .result-card {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 20px 30px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          margin-top: 20px;
        }

        .result-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .result-value {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          padding: 15px 0;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          margin-top: 10px;
        }

        .no-result {
          font-size: 1.1rem;
          opacity: 0.9;
          text-align: center;
          padding: 15px 0;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          margin-top: 10px;
        }

        /* Stats Cards */
        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 1.8rem;
        }

        .stat-icon.blue {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
        }

        .stat-icon.green {
          background: rgba(76, 217, 100, 0.1);
          color: #4cd964;
        }

        .stat-icon.purple {
          background: rgba(118, 75, 162, 0.1);
          color: #764ba2;
        }

        .stat-icon.orange {
          background: rgba(249, 115, 22, 0.1);
          color: #f97316;
        }

        .stat-value {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .stat-label {
          color: #718096;
          font-size: 1rem;
          font-weight: 500;
        }

        /* Tabs Navigation - CHANGED: Added 'results' tab */
        .tabs-navigation {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          border-bottom: 2px solid #f0f2f5;
          padding-bottom: 15px;
        }

        .tab-btn {
          padding: 12px 28px;
          border: none;
          background: none;
          font-size: 1rem;
          font-weight: 600;
          color: #718096;
          cursor: pointer;
          border-radius: 10px;
          transition: all 0.3s ease;
          position: relative;
        }

        .tab-btn.active {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -17px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #667eea;
          border-radius: 3px;
        }

        /* Semester Selector */
        .semester-selector {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .semester-btn {
          padding: 10px 24px;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 12px;
          font-weight: 600;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .semester-btn.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-color: #667eea;
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }

        /* Table Styles */
        .dashboard-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .dashboard-table thead {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .dashboard-table th {
          padding: 20px 25px;
          text-align: left;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
        }

        .dashboard-table th:first-child {
          border-radius: 15px 0 0 0;
        }

        .dashboard-table th:last-child {
          border-radius: 0 15px 0 0;
        }

        .dashboard-table tbody tr {
          transition: all 0.3s ease;
          border-bottom: 1px solid #f0f2f5;
        }

        .dashboard-table tbody tr:last-child {
          border-bottom: none;
        }

        .dashboard-table tbody tr:hover {
          background: rgba(102, 126, 234, 0.05);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .dashboard-table td {
          padding: 18px 25px;
          color: #4a5568;
          font-size: 1rem;
          border: none;
        }

        /* Badge Styles */
        .subject-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .theory-badge {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .practical-badge {
          background: rgba(76, 217, 100, 0.1);
          color: #4cd964;
          border: 1px solid rgba(76, 217, 100, 0.2);
        }

        .grade-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }

        .grade-a-plus {
          background: rgba(46, 204, 113, 0.2);
          color: #27ae60;
          border: 1px solid rgba(46, 204, 113, 0.3);
        }

        .grade-a {
          background: rgba(52, 152, 219, 0.2);
          color: #2980b9;
          border: 1px solid rgba(52, 152, 219, 0.3);
        }

        .grade-b-plus {
          background: rgba(155, 89, 182, 0.2);
          color: #8e44ad;
          border: 1px solid rgba(155, 89, 182, 0.3);
        }

        /* CHANGED: Added Result Display Styles */
        .result-display-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 50px 20px;
          text-align: center;
        }

        .result-icon {
          font-size: 5rem;
          margin-bottom: 30px;
          color: #10b981;
        }

        .result-main-value {
          font-size: 4rem;
          font-weight: 800;
          color: #059669;
          margin: 20px 0;
          padding: 20px 40px;
          background: rgba(16, 185, 129, 0.1);
          border-radius: 20px;
          border: 3px solid #10b981;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.2);
        }

        .result-message {
          font-size: 1.2rem;
          color: #4a5568;
          max-width: 600px;
          margin: 20px auto;
          line-height: 1.6;
        }

        .result-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 40px;
          width: 100%;
        }

        .result-detail-card {
          background: white;
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          text-align: center;
        }

        .result-detail-title {
          font-size: 1rem;
          color: #718096;
          margin-bottom: 10px;
          font-weight: 600;
        }

        .result-detail-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2c3e50;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 80px 20px;
        }

        .empty-icon {
          font-size: 5rem;
          margin-bottom: 25px;
          opacity: 0.5;
          color: #667eea;
        }

        .empty-title {
          font-size: 1.8rem;
          color: #4a5568;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .empty-message {
          color: #718096;
          font-size: 1.1rem;
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Loading and Error Styles (reuse from pending users) */
        .loading-container, .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 40px;
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

        .error-icon {
          font-size: 5rem;
          margin-bottom: 25px;
          color: #ff6b6b;
        }

        .error-title {
          font-size: 1.8rem;
          color: #2c3e50;
          margin-bottom: 15px;
        }

        .error-message {
          color: #718096;
          margin-bottom: 30px;
          max-width: 400px;
          line-height: 1.6;
        }

        .retry-btn {
          padding: 14px 35px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 5px 18px rgba(102, 126, 234, 0.3);
          font-size: 1rem;
        }

        .retry-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        /* Animations */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .dashboard-container {
            margin: 0 30px;
            padding: 30px;
          }
        }

        @media (max-width: 992px) {
          .page-container {
            padding-top: 80px;
          }
          
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          
          .user-info-card {
            align-self: stretch;
          }
          
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-container {
            padding-top: 70px;
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .dashboard-container {
            padding: 25px;
            margin: 0 15px;
          }
          
          .dashboard-title {
            font-size: 1.8rem;
          }
          
          .stats-container {
            grid-template-columns: 1fr;
          }
          
          .dashboard-table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
          
          .dashboard-table th,
          .dashboard-table td {
            padding: 15px 18px;
            font-size: 0.95rem;
          }
          
          .tabs-navigation {
            flex-wrap: wrap;
          }
          
          .tab-btn {
            padding: 10px 20px;
            font-size: 0.95rem;
          }
          
          .result-main-value {
            font-size: 3rem;
            padding: 15px 30px;
          }
          
          .result-details {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 576px) {
          .page-container {
            padding-top: 60px;
            padding-left: 10px;
            padding-right: 10px;
          }
          
          .dashboard-container {
            padding: 20px 15px;
            margin: 0;
            border-radius: 15px;
          }
          
          .dashboard-title {
            font-size: 1.5rem;
          }
          
          .dashboard-table th,
          .dashboard-table td {
            padding: 12px 15px;
            font-size: 0.9rem;
          }
          
          .subject-badge, .grade-badge {
            padding: 6px 12px;
            font-size: 0.85rem;
          }
          
          .result-main-value {
            font-size: 2.5rem;
            padding: 10px 20px;
          }
          
          .result-details {
            grid-template-columns: 1fr;
          }
        }
        `}
      </style>

      <div className="page-container">
        <div className="dashboard-container">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <div>
              <h2 className="dashboard-title">
                Student <span>Dashboard</span>
              </h2>
              <p style={{ color: '#718096', marginTop: '10px', fontSize: '1rem' }}>
                Welcome to your academic dashboard
              </p>
            </div>
            
            {userProfile && (
              <div className="user-info-card">
                <div className="user-name">{userProfile.name}</div>
                <div className="user-detail">{userProfile.email}</div>
                <div className="user-detail">{userProfile.course} - {userProfile.year}</div>
                <div className="user-detail">Student ID: {userProfile.userId?.slice(-8) || 'N/A'}</div>
                
                {/* ADDED: Result display in header card */}
                <div className="result-card">
                  <div className="result-title">
                    <span>📊</span> Overall Result
                  </div>
                  {userProfile.result ? (
                    <div className="result-value">{userProfile.result}</div>
                  ) : (
                    <div className="no-result">Result not available yet</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stats Cards - CHANGED: Added result stats card */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-icon blue">📚</div>
              <div className="stat-value">{subjects.length}</div>
              <div className="stat-label">Subjects in {selectedSemester}</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon green">📊</div>
              <div className="stat-value">{calculateGPA()}</div>
              <div className="stat-label">Current GPA</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon purple">🎓</div>
              <div className="stat-value">{grades.length}</div>
              <div className="stat-label">Graded Subjects</div>
            </div>
            
            {/* ADDED: Result status card */}
            <div className="stat-card">
              <div className="stat-icon orange">🏆</div>
              <div className="stat-value">
                {userProfile?.result ? userProfile.result : 'N/A'}
              </div>
              <div className="stat-label">Final Result</div>
            </div>
          </div>

          {/* Tabs Navigation - CHANGED: Added 'results' tab */}
          <div className="tabs-navigation">
            <button 
              className={`tab-btn ${activeTab === 'subjects' ? 'active' : ''}`}
              onClick={() => setActiveTab('subjects')}
            >
              📖 Course Subjects
            </button>
            <button 
              className={`tab-btn ${activeTab === 'grades' ? 'active' : ''}`}
              onClick={() => setActiveTab('grades')}
            >
              📊 Academic Grades
            </button>
            <button 
              className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
              onClick={() => setActiveTab('results')}
            >
              🏆 Final Result
            </button>
          </div>

          {/* Subjects Tab Content */}
          {activeTab === 'subjects' && (
            <>
              {/* Semester Selector */}
              <div className="semester-selector">
                {getAvailableSemesters().map(semester => (
                  <button
                    key={semester}
                    className={`semester-btn ${selectedSemester === semester ? 'active' : ''}`}
                    onClick={() => handleSemesterChange(semester)}
                  >
                    {semester}
                  </button>
                ))}
              </div>

              {/* Subjects Table */}
              {subjects.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <h3 className="empty-title">No Subjects Found</h3>
                  <p className="empty-message">
                    No subjects available for {selectedSemester} of {userProfile?.course || 'your course'}.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Credits</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjects.map((subject, index) => (
                        <tr key={index}>
                          <td>{subject.code}</td>
                          <td>{subject.name}</td>
                          <td>{subject.credits}</td>
                          <td>
                            <span className={`subject-badge ${
                              subject.type === 'Practical' ? 'practical-badge' : 'theory-badge'
                            }`}>
                              {subject.type}
                            </span>
                          </td>
                          <td>
                            <span className="subject-badge" style={{
                              background: 'rgba(52, 152, 219, 0.1)',
                              color: '#2980b9',
                              border: '1px solid rgba(52, 152, 219, 0.2)'
                            }}>
                              Enrolled
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Grades Tab Content */}
          {activeTab === 'grades' && (
            <>
              {grades.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📊</div>
                  <h3 className="empty-title">No Grades Available</h3>
                  <p className="empty-message">
                    Your grades will appear here once they are updated by the administrator.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Semester</th>
                        <th>Credits</th>
                        <th>Grade</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grades.map((grade, index) => (
                        <tr key={index}>
                          <td>{grade.subjectCode}</td>
                          <td>{grade.subjectName}</td>
                          <td>{grade.semester}</td>
                          <td>{grade.credits}</td>
                          <td>
                            <span className={`grade-badge ${
                              grade.grade === 'A+' ? 'grade-a-plus' :
                              grade.grade === 'A' ? 'grade-a' :
                              'grade-b-plus'
                            }`}>
                              {grade.grade}
                            </span>
                          </td>
                          <td>
                            <span className="subject-badge" style={{
                              background: 'rgba(46, 204, 113, 0.1)',
                              color: '#27ae60',
                              border: '1px solid rgba(46, 204, 113, 0.2)'
                            }}>
                              Completed
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}


          {/* ADDED: Results Tab Content */}
          {activeTab === 'results' && (
            <div className="result-display-container">
              {userProfile?.result ? (
                <>
                  <div className="result-icon">🏆</div>
                  <h2 className="dashboard-title" style={{ marginBottom: '20px' }}>
                    Your Final Result
                  </h2>
                  <div className="result-main-value">
                    {userProfile.result}
                  </div>
                  <p className="result-message">
                    Congratulations! This is your official final result for {userProfile.course}. 
                    This result has been approved by the examination board and is now part of your permanent academic record.
                  </p>
                  
                  <div className="result-details">
                    <div className="result-detail-card">
                      <div className="result-detail-title">Student Name</div>
                      <div className="result-detail-value">{userProfile.name}</div>
                    </div>
                    
                    <div className="result-detail-card">
                      <div className="result-detail-title">Course</div>
                      <div className="result-detail-value">{userProfile.course}</div>
                    </div>
                    
                    <div className="result-detail-card">
                      <div className="result-detail-title">Year</div>
                      <div className="result-detail-value">{userProfile.year}</div>
                    </div>
                    
                    <div className="result-detail-card">
                      <div className="result-detail-title">GPA</div>
                      <div className="result-detail-value">{calculateGPA()}</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="empty-icon">📊</div>
                  <h3 className="empty-title">Result Pending</h3>
                  <p className="empty-message">
                    Your final result is not available yet. 
                    Please check back later or contact your course coordinator for more information.
                  </p>
                  <p style={{ color: '#718096', marginTop: '20px', fontSize: '0.95rem' }}>
                    Note: Results are typically updated after the examination process is complete.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;