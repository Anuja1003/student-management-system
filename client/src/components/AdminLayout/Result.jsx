import React from "react";
import { apiService } from "./services/api";

export default class Results extends React.Component {
  state = {
    users: [],
    loading: true,
    error: "",
    searchTerm: "",
    editingUserId: null,
    editingResult: "",
  };

  componentDidMount() {
    this.fetchStudentsWithResults();
  }

  fetchStudentsWithResults = async () => {
    this.setState({ loading: true, error: "" });
    try {
      // Use the new API method
      const data = await apiService.getStudentsWithResults();
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

  handleEditClick = (userId, currentResult = "") => {
    this.setState({ 
      editingUserId: userId,
      editingResult: currentResult || ""
    });
  };

  handleResultChange = (e) => {
    this.setState({ editingResult: e.target.value });
  };

  handleSaveResult = async (userId) => {
    const { editingResult } = this.state;
    
    if (!editingResult.trim()) {
      alert("Please enter a result before saving.");
      return;
    }

    try {
      // Update student result using the new API
      await apiService.updateStudentResult(userId, editingResult);
      alert('Result saved successfully!');
      
      // Update local state immediately
      this.setState(prevState => ({
        users: prevState.users.map(user => 
          user._id === userId 
            ? { ...user, result: editingResult }
            : user
        ),
        editingUserId: null,
        editingResult: ""
      }));
      
    } catch (err) {
      console.error("Error saving result:", err);
      alert('Failed to save result. Please try again.');
    }
  };

  handleCancelEdit = () => {
    this.setState({ 
      editingUserId: null,
      editingResult: ""
    });
  };

  render() {
    const { users, loading, error, searchTerm, editingUserId, editingResult } = this.state;

    // Filter users based on search term
    const filteredUsers = users.filter((user) => {
      // If no search term, include all
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
          .results-page {
            min-height: 100vh;
            background: linear-gradient(135deg, #f0f9ff 0%, #e6f7ff 100%);
            padding: 100px 20px 50px;
            position: relative;
            overflow: hidden;
          }

          .results-page::before {
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
          .results-container {
            max-width: 1600px;
            margin: 0 auto;
            position: relative;
            z-index: 2;
            animation: fadeIn 0.6s ease;
          }

          /* Header Section */
          .results-header {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 25px 25px 0 0;
            padding: 40px 50px;
            color: white;
            box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
            position: relative;
            overflow: hidden;
          }

          .results-header::before {
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
          .results-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            overflow: hidden;
          }

          .results-table thead {
            background: linear-gradient(135deg, #1e293b, #0f172a);
          }

          .results-table th {
            padding: 22px 25px;
            text-align: center;
            color: white;
            font-weight: 600;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
          }

          .results-table th:first-child {
            padding-left: 40px;
          }

          .results-table th:last-child {
            padding-right: 40px;
          }

          .results-table tbody tr {
            transition: all 0.3s ease;
            border-bottom: 1px solid #f0f2f5;
          }

          .results-table tbody tr:last-child {
            border-bottom: none;
          }

          .results-table tbody tr:hover {
            background: rgba(59, 130, 246, 0.05);
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
          }

          .results-table td {
            padding: 20px 25px;
            color: #4a5568;
            font-size: 1rem;
            border: none;
            vertical-align: middle;
            text-align: center;
          }

          .results-table td:first-child {
            padding-left: 40px;
            font-weight: 600;
            color: #3b82f6;
            font-size: 1.1rem;
            text-align: center;
          }

          .results-table td:last-child {
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

          /* Result Field Styles */
          .result-display {
            padding: 10px 20px;
            background: #f0fdf4;
            border-radius: 10px;
            color: #166534;
            font-weight: 600;
            border: 2px solid #bbf7d0;
            min-width: 100px;
            display: inline-block;
          }

          .result-input {
            width: 120px;
            padding: 10px 15px;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            background: white;
            color: #1e40af;
          }

          .result-input:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          }

          .no-result {
            padding: 10px 20px;
            background: #fef2f2;
            border-radius: 10px;
            color: #991b1b;
            font-weight: 500;
            border: 2px solid #fecaca;
            min-width: 100px;
            display: inline-block;
          }

          /* Date Style */
          .date-cell {
            color: #4a5568;
            font-weight: 500;
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
            .results-header {
              padding: 35px 40px;
            }
            
            .header-text h1 {
              font-size: 2.2rem;
            }
            
            .results-table th,
            .results-table td {
              padding: 18px 20px;
            }
          }

          @media (max-width: 992px) {
            .results-page {
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
            .results-page {
              padding: 80px 15px 30px;
            }
            
            .results-header {
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
            
            .results-table {
              min-width: 900px;
            }
            
            .results-table th,
            .results-table td {
              padding: 16px 18px;
            }
            
            .results-table th:first-child,
            .results-table td:first-child {
              padding-left: 25px;
            }
            
            .results-table th:last-child,
            .results-table td:last-child {
              padding-right: 25px;
            }
            
            .action-buttons {
              flex-direction: column;
              align-items: stretch;
            }
          }

          @media (max-width: 576px) {
            .results-page {
              padding: 70px 10px 25px;
            }
            
            .results-header {
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
            
            .results-table {
              min-width: 800px;
            }
            
            .results-table th,
            .results-table td {
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

        <div className="results-page">
          <div className="results-container">
            {/* Header Section */}
            <div className="results-header">
              <div className="header-content">
                <div className="header-text">
                  <h1>Student Results Management</h1>
                  <p>
                    View and manage student results. You can edit results by clicking the edit button.
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
                  placeholder="Search by student name or course..."
                  value={searchTerm}
                  onChange={this.handleSearch}
                />
                {/*<div className="search-hint">
                  Type to filter students by name or course
                </div>*/}
              </div>
            </div>

            {/* Table Section */}
            <div className="table-container">
              {loading ? (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p className="loading-text">Loading student results...</p>
                </div>
              ) : error ? (
                <div className="error-container">
                  <div className="error-icon">⚠️</div>
                  <h3 className="error-title">Error Loading Results</h3>
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
                  <div className="empty-icon">📊</div>
                  <h3 className="empty-title">No Students Found</h3>
                  <p className="empty-message">
                    {searchTerm 
                      ? `No students found matching "${searchTerm}"`
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
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>SI. No.</th>
                      <th>Student Name</th>
                      <th>Email Address</th>
                      <th>Course</th>
                      <th>Result</th>
                      <th>Registration Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, index) => (
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
                            <input
                              type="text"
                              className="result-input"
                              value={editingResult}
                              onChange={this.handleResultChange}
                              placeholder="Enter result"
                              autoFocus
                            />
                          ) : user.result ? (
                            <div className="result-display">{user.result}</div>
                          ) : (
                            <div className="no-result">Not Set</div>
                          )}
                        </td>
                        <td className="date-cell">
                          {user.createdAt 
                            ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })
                            : user.registrationDate || "N/A"}
                        </td>
                        <td>
                          <div className="action-buttons">
                            {editingUserId === (user._id || user.id) ? (
                              <>
                                <button
                                  className="save-btn"
                                  onClick={() => this.handleSaveResult(user._id || user.id)}
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
                                onClick={() => this.handleEditClick(user._id || user.id, user.result)}
                              >
                                ✏️ Edit Result
                              </button>
                            )}
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