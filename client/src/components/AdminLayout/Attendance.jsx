import React from "react";
import { apiService } from "./services/api";

export default class Attendance extends React.Component {
  state = {
    users: [],
    loading: true,
    error: "",
    searchTerm: "",
    editingUserId: null,
    editingAttendance: "",
    editingTotalClasses: "",
  };

  componentDidMount() {
    this.fetchStudentsWithAttendance();
  }

  fetchStudentsWithAttendance = async () => {
    this.setState({ loading: true, error: "" });
    try {
      console.log("Fetching students with attendance...");
      const data = await apiService.getStudentsWithAttendance();
      console.log("Received data:", data);
      
      this.setState({ 
        users: data.users || [], 
        loading: false 
      });
    } catch (err) {
      console.error("Error fetching students:", err);
      this.setState({ 
        error: "Failed to load students. Please try again.", 
        loading: false 
      });
    }
  };

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleEditClick = (userId, currentAttendance = "", currentTotalClasses = "") => {
    console.log("Edit clicked for user:", userId, "Current attendance:", currentAttendance, "Total classes:", currentTotalClasses);
    this.setState({ 
      editingUserId: userId,
      editingAttendance: currentAttendance || "",
      editingTotalClasses: currentTotalClasses || ""
    });
  };

  handleAttendanceChange = (e) => {
    this.setState({ editingAttendance: e.target.value });
  };

  handleTotalClassesChange = (e) => {
    this.setState({ editingTotalClasses: e.target.value });
  };

  handleSaveAttendance = async (userId) => {
    const { editingAttendance, editingTotalClasses } = this.state;
    
    if (editingAttendance === "" || editingTotalClasses === "") {
      alert("Please enter both attendance and total classes before saving.");
      return;
    }

    // Validate numeric values
    if (isNaN(editingAttendance) || isNaN(editingTotalClasses)) {
      alert("Please enter valid numbers for attendance and total classes.");
      return;
    }

    const attendanceNum = parseInt(editingAttendance);
    const totalClassesNum = parseInt(editingTotalClasses);

    if (attendanceNum < 0 || totalClassesNum < 0) {
      alert("Values cannot be negative.");
      return;
    }

    if (attendanceNum > totalClassesNum) {
      alert("Attendance cannot be greater than total classes.");
      return;
    }

    try {
      // Update student attendance using API
      const response = await apiService.updateStudentAttendance(userId, attendanceNum, totalClassesNum);
      const updatedUser = response.user; // returned from backend
      
      alert('Attendance saved successfully!');
      
      // Update local state immediately
      this.setState(prevState => ({
        users: prevState.users.map(user => 
          user._id === userId 
            ? { 
                ...user, 
                attendance: attendanceNum,
                totalClasses: totalClassesNum,
                attendancePercentage: Math.round((attendanceNum / totalClassesNum) * 100),
                attendanceUpdatedAt: updatedUser?.attendanceUpdatedAt || 
                                    updatedUser?.updatedAt || 
                                    new Date().toISOString()
              }
            : user
        ),
        editingUserId: null,
        editingAttendance: "",
        editingTotalClasses: ""
      }));
      
    } catch (err) {
      console.error("Error saving attendance:", err);
      alert(`Failed to save attendance: ${err.message}. Please try again.`);
    }
  };

  handleCancelEdit = () => {
    this.setState({ 
      editingUserId: null,
      editingAttendance: "",
      editingTotalClasses: ""
    });
  };

  calculateAttendancePercentage = (attendance, totalClasses) => {
    if (!attendance || !totalClasses || totalClasses === 0) return 0;
    return Math.round((attendance / totalClasses) * 100);
  };

  getAttendanceColor = (percentage) => {
    if (percentage >= 75) return "#166534"; // Green
    if (percentage >= 60) return "#ca8a04"; // Yellow
    return "#dc2626"; // Red
  };

  getAttendanceBackground = (percentage) => {
    if (percentage >= 75) return "#f0fdf4"; // Light green
    if (percentage >= 60) return "#fefce8"; // Light yellow
    return "#fef2f2"; // Light red
  };

  getAttendanceBorder = (percentage) => {
    if (percentage >= 75) return "#bbf7d0"; // Green
    if (percentage >= 60) return "#fde68a"; // Yellow
    return "#fecaca"; // Red
  };

  render() {
    const { users, loading, error, searchTerm, editingUserId, editingAttendance, editingTotalClasses } = this.state;

    const filteredUsers = users.filter((user) => {
      if (!searchTerm.trim()) return true;
      
      const term = searchTerm.toLowerCase();
      return (
        (user.name && user.name.toLowerCase().includes(term)) ||
        (user.course && user.course.toLowerCase().includes(term)) ||
        (user.email && user.email.toLowerCase().includes(term))
      );
    });

    return (
      <>
        <style>
          {`
          /* Page Container */
          .attendance-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
            padding: 100px 20px 50px;
            position: relative;
            overflow: hidden;
          }

          .attendance-page::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.03) 0%, transparent 50%);
            z-index: 1;
          }

          /* Main Container */
          .attendance-container {
            max-width: 1600px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            animation: fadeIn 0.6s ease;
          }

          /* Header Section */
          .attendance-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 25px 25px 0 0;
            padding: 40px 50px;
            color: white;
            box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
            position: relative;
            overflow: hidden;
          }

          .attendance-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8, #10b981);
          }

          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }

          .header-text h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 10px;
            color: white;
          }

          .header-text p {
            font-size: 1.1rem;
            color: rgba(255, 255, 255, 0.9);
            max-width: 600px;
            line-height: 1.6;
          }

          .header-stats {
            display: flex;
            align-items: center;
            gap: 15px;
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            padding: 15px 25px;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          .stats-count {
            font-size: 2.5rem;
            font-weight: 800;
            color: #10b981;
            line-height: 1;
          }

          .stats-label {
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.9);
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          /* Search Bar */
          .search-container {
            background: white;
            padding: 25px 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            border-radius: 0 0 25px 25px;
            margin-bottom: 30px;
          }

          .search-box {
            position: relative;
            max-width: 500px;
          }

          .search-input {
            width: 100%;
            padding: 16px 20px 16px 50px;
            border: 2px solid #e2e8f0;
            border-radius: 15px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #f8fafc;
            color: #2d3748;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          }

          .search-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
            outline: none;
            background: white;
          }

          .search-icon {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
            font-size: 1.2rem;
          }

          /* Table Container */
          .table-container {
            background: white;
            border-radius: 25px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            margin-bottom: 40px;
          }

          /* Table Styles */
          .attendance-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            overflow: hidden;
          }

          .attendance-table thead {
            background: linear-gradient(135deg, #1e293b, #0f172a);
          }

          .attendance-table th {
            padding: 22px 25px;
            text-align: center;
            color: white;
            font-weight: 600;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
          }

          .attendance-table th:first-child {
            padding-left: 40px;
          }

          .attendance-table th:last-child {
            padding-right: 40px;
          }

          .attendance-table tbody tr {
            transition: all 0.3s ease;
            border-bottom: 1px solid #f0f2f5;
          }

          .attendance-table tbody tr:last-child {
            border-bottom: none;
          }

          .attendance-table tbody tr:hover {
            background: rgba(59, 130, 246, 0.05);
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          }

          .attendance-table td {
            padding: 20px 25px;
            color: #4a5568;
            font-size: 1rem;
            border: none;
            vertical-align: middle;
            text-align: center;
          }

          .attendance-table td:first-child {
            padding-left: 40px;
            font-weight: 600;
            color: #3b82f6;
            font-size: 1.1rem;
            text-align: center;
          }

          .attendance-table td:last-child {
            padding-right: 40px;
          }

          /* Student Name Style */
          .student-name {
            font-weight: 600;
            color: #2c3e50;
            font-size: 1.1rem;
          }

          .student-email {
            color: #718096;
            font-size: 0.95rem;
          }

          .student-course {
            color: #4a5568;
            font-weight: 500;
            padding: 8px 16px;
            background: #f1f5f9;
            border-radius: 8px;
            display: inline-block;
          }

          /* Attendance Display Styles */
          .attendance-display {
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: 600;
            min-width: 100px;
            display: inline-block;
          }

          .attendance-input {
            width: 80px;
            padding: 10px 15px;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            background: white;
            color: #1e40af;
            margin: 0 5px;
          }

          .attendance-input:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          }

          .no-attendance {
            padding: 10px 20px;
            background: #fef2f2;
            border-radius: 10px;
            color: #991b1b;
            font-weight: 500;
            border: 2px solid #fecaca;
            min-width: 100px;
            display: inline-block;
          }

          /* Attendance Percentage Styles */
          .attendance-percentage {
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: 600;
            min-width: 100px;
            display: inline-block;
          }

          /* Date Style */
          .date-cell {
            color: #4a5568;
            font-weight: 500;
          }

          /* Input Group for two inputs */
          .input-group {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
          }

          .input-separator {
            color: #3b82f6;
            font-weight: bold;
            font-size: 1.2rem;
          }

          /* Loading State */
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            padding: 60px;
          }

          .loading-spinner {
            width: 60px;
            height: 60px;
            border: 4px solid #f0f2f5;
            border-top: 4px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 25px;
          }

          .loading-text {
            color: #718096;
            font-size: 1.2rem;
            font-weight: 500;
          }

          /* Error State */
          .error-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
            padding: 60px;
            text-align: center;
          }

          .error-icon {
            font-size: 4rem;
            color: #ff6b6b;
            margin-bottom: 25px;
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
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 18px rgba(59, 130, 246, 0.3);
            font-size: 1rem;
          }

          .retry-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }

          /* Empty State */
          .empty-state {
            text-align: center;
            padding: 80px 40px;
          }

          .empty-icon {
            font-size: 5rem;
            color: #3b82f6;
            margin-bottom: 25px;
            opacity: 0.5;
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
            margin: 0 auto 30px;
            line-height: 1.6;
          }

          .refresh-btn {
            padding: 14px 35px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 18px rgba(59, 130, 246, 0.3);
            font-size: 1rem;
          }

          .refresh-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
          }

          /* Action Buttons */
          .action-buttons {
            display: flex;
            gap: 10px;
            justify-content: center;
            align-items: center;
          }

          .edit-btn {
            padding: 10px 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .edit-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
          }

          .save-btn {
            padding: 10px 20px;
            background: linear-gradient(135deg, #10b981, #059669);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .save-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
          }

          .cancel-btn {
            padding: 10px 20px;
            background: linear-gradient(135deg, #ef4444, #dc2626);
            border: none;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .cancel-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(239, 68, 68, 0.4);
          }

          /* Responsive Design */
          @media (max-width: 1200px) {
            .attendance-header {
              padding: 35px 40px;
            }
            
            .header-text h1 {
              font-size: 2.2rem;
            }
            
            .attendance-table th,
            .attendance-table td {
              padding: 18px 20px;
            }
          }

          @media (max-width: 992px) {
            .attendance-page {
              padding: 90px 15px 40px;
            }
            
            .header-content {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .header-stats {
              align-self: flex-start;
            }
            
            .search-container {
              padding: 20px 30px;
            }
          }

          @media (max-width: 768px) {
            .attendance-page {
              padding: 80px 15px 30px;
            }
            
            .attendance-header {
              padding: 30px 25px;
              border-radius: 20px 20px 0 0;
            }
            
            .header-text h1 {
              font-size: 1.8rem;
            }
            
            .header-text p {
              font-size: 1rem;
            }
            
            .stats-count {
              font-size: 2rem;
            }
            
            .search-container {
              padding: 20px;
              border-radius: 0 0 20px 20px;
            }
            
            .search-input {
              padding: 14px 20px 14px 45px;
            }
            
            .table-container {
              overflow-x: auto;
              border-radius: 20px;
            }
            
            .attendance-table {
              min-width: 900px;
            }
            
            .attendance-table th,
            .attendance-table td {
              padding: 16px 18px;
            }
            
            .attendance-table th:first-child,
            .attendance-table td:first-child {
              padding-left: 25px;
            }
            
            .attendance-table th:last-child,
            .attendance-table td:last-child {
              padding-right: 25px;
            }
            
            .action-buttons {
              flex-direction: column;
              align-items: stretch;
            }
            
            .input-group {
              flex-direction: column;
              gap: 10px;
            }
            
            .input-separator {
              display: none;
            }
          }

          @media (max-width: 576px) {
            .attendance-page {
              padding: 70px 10px 25px;
            }
            
            .attendance-header {
              padding: 25px 20px;
              border-radius: 15px 15px 0 0;
            }
            
            .header-text h1 {
              font-size: 1.6rem;
            }
            
            .search-container {
              padding: 15px;
              border-radius: 0 0 15px 15px;
            }
            
            .search-input {
              padding: 12px 15px 12px 40px;
            }
            
            .attendance-table {
              min-width: 800px;
            }
            
            .attendance-table th,
            .attendance-table td {
              padding: 14px 15px;
              font-size: 0.95rem;
            }
          }

          /* Animations */
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

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Scrollbar Styling */
          .table-container::-webkit-scrollbar {
            height: 8px;
          }

          .table-container::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          .table-container::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 4px;
          }

          .table-container::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #2563eb, #1e40af);
          }
          `}
        </style>

        <div className="attendance-page">
          <div className="attendance-container">
            {/* Header Section */}
            <div className="attendance-header">
              <div className="header-content">
                <div className="header-text">
                  <h1>Student Attendance Management</h1>
                  <p>
                    View and manage student attendance. You can edit attendance by clicking the edit button. Updated attendance is visible to students immediately.
                  </p>
                </div>
                <div className="header-stats">
                  <div className="stats-count">{filteredUsers.length}</div>
                  <div className="stats-label">
                    {filteredUsers.length === 1 ? 'Student' : 'Students'}
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="search-container">
              <div className="search-box">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search by student name, email, or course..."
                  value={searchTerm}
                  onChange={this.handleSearch}
                />
              </div>
            </div>

            {/* Table Section */}
            <div className="table-container">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p className="loading-text">Loading student attendance...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <div className="error-icon">⚠️</div>
                  <h3 className="error-title">Error Loading Attendance</h3>
                  <p className="error-message">{error}</p>
                  <button
                    className="retry-btn"
                    onClick={this.fetchStudentsWithAttendance}
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📊</div>
                  <h3 className="empty-title">No Students Found</h3>
                  <p className="empty-message">
                    {searchTerm 
                      ? `No students found matching "${searchTerm}"`
                      : "There are currently no students with attendance records in the system."
                    }
                  </p>
                  {searchTerm && (
                    <button
                      className="refresh-btn"
                      onClick={() => this.setState({ searchTerm: '' })}
                    >
                      Clear Search
                    </button>
                  )}
                </div>
              ) : (
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>SI. No.</th>
                      <th>Student Name</th>
                      <th>Email Address</th>
                      <th>Course</th>
                      <th>Attendance</th>
                      <th>Percentage</th>
                      <th>Last Updated</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => {
                      const attendance = user.attendance || 0;
                      const totalClasses = user.totalClasses || 0;
                      const percentage = this.calculateAttendancePercentage(attendance, totalClasses);
                      const percentageColor = this.getAttendanceColor(percentage);
                      const percentageBg = this.getAttendanceBackground(percentage);
                      const percentageBorder = this.getAttendanceBorder(percentage);
                      
                      return (
                        <tr key={user._id || user.id || index}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="student-name">{user.name || "N/A"}</div>
                          </td>
                          <td>
                            <div className="student-email">{user.email || "N/A"}</div>
                          </td>
                          <td>
                            <div className="student-course">{user.course || "N/A"}</div>
                          </td>
                          <td>
                            {editingUserId === (user._id || user.id) ? (
                              <div className="input-group">
                                <input
                                  type="number"
                                  className="attendance-input"
                                  value={editingAttendance}
                                  onChange={this.handleAttendanceChange}
                                  placeholder="Attended"
                                  autoFocus
                                  min="0"
                                />
                                <span className="input-separator">/</span>
                                <input
                                  type="number"
                                  className="attendance-input"
                                  value={editingTotalClasses}
                                  onChange={this.handleTotalClassesChange}
                                  placeholder="Total"
                                  min="0"
                                />
                              </div>
                            ) : user.attendance !== undefined && user.totalClasses !== undefined ? (
                              <div 
                                className="attendance-display"
                                style={{
                                  background: percentageBg,
                                  color: percentageColor,
                                  border: `2px solid ${percentageBorder}`
                                }}
                              >
                                {attendance} / {totalClasses}
                              </div>
                            ) : (
                              <div className="no-attendance">Not Set</div>
                            )}
                          </td>
                          <td>
                            <div 
                              className="attendance-percentage"
                              style={{
                                background: percentageBg,
                                color: percentageColor,
                                border: `2px solid ${percentageBorder}`
                              }}
                            >
                              {percentage}%
                            </div>
                          </td>
                          <td className="date-cell">
                            {user.attendanceUpdatedAt 
                              ? new Date(user.attendanceUpdatedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : user.createdAt 
                              ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })
                              : "Never"}
                          </td>
                          <td>
                            <div className="action-buttons">
                              {editingUserId === (user._id || user.id) ? (
                                <>
                                  <button
                                    className="save-btn"
                                    onClick={() => this.handleSaveAttendance(user._id || user.id)}
                                  >
                                    💾 Save
                                  </button>
                                  <button
                                    className="cancel-btn"
                                    onClick={this.handleCancelEdit}
                                  >
                                    ✖ Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  className="edit-btn"
                                  onClick={() => this.handleEditClick(user._id || user.id, user.attendance, user.totalClasses)}
                                >
                                  ✏️ Edit Attendance
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}