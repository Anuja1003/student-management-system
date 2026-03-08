import React from "react";
import { apiService } from "./services/api";

export default class AllStudents extends React.Component {
  state = {
    users: [],
    loading: true,
    error: "",
    searchTerm: "",
  };

  componentDidMount() {
    this.fetchApprovedUsers();
  }

  fetchApprovedUsers = async () => {
    this.setState({ loading: true, error: "" });
    try {
      const data = await apiService.getApprovedUsers();
      this.setState({ users: data.users || [], loading: false });
    } catch (err) {
      this.setState({ 
        error: "Failed to load approved students. Please try again.", 
        loading: false 
      });
    }
  };

  handleSearch = (e) => {
    this.setState({searchTerm: e.target.value});
  }

  //Edit and Delete Functinality
 /* handleEdit = (userId) => {
    console.log("Edit student:", userId);
  };*/

  handleDeleteUser = async (userId) => {
  if (!window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) {
    return;
  }

  try {
    await apiService.deleteUser(userId);
    alert('Student deleted successfully!');
    // Refresh the list from server
    await this.fetchApprovedUsers();
    
    
  } catch (err) {
    alert('Failed to delete student. Please try again.');
  }
};



  render() {
    const { users, loading, error, searchTerm } = this.state;

    const filteredUsers = users.filter((user) => {
      //Excludes admin
      if (user.role === "admin") return false;

      //Apply first letter search
      if (searchTerm) {
        return user.name?.toLowerCase().startsWith(searchTerm.toLowerCase()) ||
        user.course?.toLowerCase().startsWith(searchTerm.toLowerCase());
      }
      return true;
    });

    return (
      <>
        <style>
          {`
          /* Page Container */
          .students-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 100px 20px 50px; /* Space for navbar */
            position: relative;
            overflow: hidden;
          }

          .students-page::before {
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

          /* Main Container */
          .students-container {
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            animation: fadeIn 0.6s ease;
          }

          /* Header Section */
          .students-header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 25px 25px 0 0;
            padding: 40px 50px;
            color: white;
            box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
            position: relative;
            overflow: hidden;
          }

          .students-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea, #764ba2, #ffd200);
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
            color: #ffd200;
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
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
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

          .search-hint {
            color: #718096;
            font-size: 0.9rem;
            margin-top: 8px;
            padding-left: 5px;
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
          .students-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
  overflow: hidden;
          }

          .students-table thead {
            background: linear-gradient(135deg, #4a5568, #2d3748);
          }

          .students-table th {
            padding: 22px 25px;
            text-align: center;
            color: white;
            font-weight: 600;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
          }

          .students-table th:first-child {
            padding-left: 40px;
          }

          .students-table th:last-child {
            padding-right: 40px;
          }

          .students-table tbody tr {
            transition: all 0.3s ease;
            border-bottom: 1px solid #f0f2f5;
          }

          .students-table tbody tr:last-child {
            border-bottom: none;
          }

          .students-table tbody tr:hover {
            background: rgba(102, 126, 234, 0.05);
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          }

          .students-table td {
            padding: 20px 25px;
            color: #4a5568;
            font-size: 1rem;
            border: none;
            vertical-align: middle;
          }

          .students-table td:first-child {
            padding-left: 40px;
            font-weight: 600;
            color: #667eea;
            font-size: 1.1rem;
          }

          .students-table td:last-child {
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

          /* Date Style */
          .date-cell {
            color: #4a5568;
            font-weight: 500;
          }

          /* Status Badge */
          .status-badge {
            padding: 8px 18px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            background: linear-gradient(135deg, #4cd964, #2ecc71);
            color: white;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(76, 217, 100, 0.3);
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

          /* Empty State */
          .empty-state {
            text-align: center;
            padding: 80px 40px;
          }

          .empty-icon {
            font-size: 5rem;
            color: #667eea;
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

          .refresh-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
          }

          /* Responsive Design */
          @media (max-width: 1200px) {
            .students-header {
              padding: 35px 40px;
            }
            
            .header-text h1 {
              font-size: 2.2rem;
            }
            
            .students-table th,
            .students-table td {
              padding: 18px 20px;
            }
          }

          @media (max-width: 992px) {
            .students-page {
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
            .students-page {
              padding: 80px 15px 30px;
            }
            
            .students-header {
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
            
            .students-table {
              min-width: 800px;
            }
            
            .students-table th,
            .students-table td {
              padding: 16px 18px;
            }
            
            .students-table th:first-child,
            .students-table td:first-child {
              padding-left: 25px;
            }
            
            .students-table th:last-child,
            .students-table td:last-child {
              padding-right: 25px;
            }
          }

          @media (max-width: 576px) {
            .students-page {
              padding: 70px 10px 25px;
            }
            
            .students-header {
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
            
            .students-table {
              min-width: 700px;
            }
            
            .students-table th,
            .students-table td {
              padding: 14px 15px;
              font-size: 0.95rem;
            }
            
            .status-badge {
              padding: 6px 12px;
              font-size: 0.8rem;
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

          /* Hover Effects */
          .student-name {
            transition: color 0.3s ease;
          }

          .students-table tbody tr:hover .student-name {
            color: #667eea;
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
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 4px;
          }

          .table-container::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a6fd8, #6a3f9d);
          }

          .action-buttons{
          display: flex;
          gap: 10px;
          justify-content: center;
          }

         /* .edit-btn{
          padding: 8px 14px;
          background: linear-gradient(135deg, #4facfe, #00c6fb);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          curser:pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          }

          .edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(79, 172, 254, 0.4);
}*/

.delete-btn {
  padding: 8px 14px;
  background: linear-gradient(135deg, #ff6b6b, #ee5253);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(238, 82, 83, 0.4);
}

          `}
        </style>

        <div className="students-page">
          <div className="students-container">
            {/* Header Section */}
            <div className="students-header">
              <div className="header-content">
                <div className="header-text">
                  <h1>All Students List</h1>
                  <p>
                    View all approved students in the Student Management System
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
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={this.handleSearch}
                />
                {/*<div className="search-hint">
                  Type the first letters of the student's name to filter results
                </div>*/}
              </div>
            </div>

            {/* Table Section */}
            <div className="table-container">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p className="loading-text">Loading students...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <div className="error-icon">⚠️</div>
                  <h3 className="error-title">Error Loading Students</h3>
                  <p className="error-message">{error}</p>
                  <button
                    className="retry-btn"
                    onClick={this.fetchApprovedUsers}
                  >
                    Try Again
                  </button>
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📚</div>
                  <h3 className="empty-title">No Students Found</h3>
                  <p className="empty-message">
                    {searchTerm 
                      ? `No students found starting with "${searchTerm}"`
                      : "There are currently no approved students in the system."
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
                <table className="students-table">
                  <thead>
                    <tr>
                      <th>SI. No.</th>
                      <th>Student Name</th>
                      <th>Email Address</th>
                      <th>Course</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="student-name">{user.name || "N/A"}</div>
                        </td>
                        <td>
                          <div className="student-email">{user.email}</div>
                        </td>
                         <td>
                          <div className="student-course">{user.course}</div>
                        </td>
                        <td className="date-cell">
                          {user.createdAt 
                            ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : "N/A"}
                        </td>

                        <td>
                          <div className="action-buttons">
                            {/*<button
                              className="edit-btn"
                              onClick={() => this.handleEdit(user._id)}
                            >
                              ✏️ Edit
                            </button>*/}

                            <button
                              className="delete-btn"
                              onClick={() => this.handleDeleteUser(user._id)}
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
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