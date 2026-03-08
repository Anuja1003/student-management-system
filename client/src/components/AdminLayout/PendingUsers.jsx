import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';

const PendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getPendingUsers();
      // Filter only pending users
      const pending = data.users.filter(user => user.status === 'pending');
      setPendingUsers(pending);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pending users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await apiService.updateUserStatus(userId, 'active');
      alert('User approved successfully!');
      fetchPendingUsers(); // Refresh the list
    } catch (err) {
      console.error('Error approving user:', err);
      alert('Failed to approve user');
    }
  };

  const handleReject = async (userId) => {
    try {
      await apiService.updateUserStatus(userId, 'rejected');
      alert('User rejected!');
      fetchPendingUsers(); // Refresh the list
    } catch (err) {
      console.error('Error rejecting user:', err);
      alert('Failed to reject user');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading pending users...</p>
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
          <h3 className="error-title">Error Loading Users</h3>
          <p className="error-message">{error}</p>
          <button 
            className="retry-btn"
            onClick={fetchPendingUsers}
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
          padding-top: 90px; /* Add space for navbar */
          padding-left: 20px;
          padding-right: 20px;
          padding-bottom: 40px;
          min-height: calc(100vh - 90px);
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        /* Main Content Container */
        .pending-users-container {
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
        .pending-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-bottom: 25px;
          border-bottom: 2px solid #f0f2f5;
        }

        .pending-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #2c3e50;
          margin: 0;
        }

        .pending-title span {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .pending-count {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1.1rem;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        /* Table Styles */
        .pending-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          overflow: hidden;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
        }

        .pending-table thead {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .pending-table th {
          padding: 20px 25px;
          text-align: left;
          color: white;
          font-weight: 600;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: none;
        }

        .pending-table th:first-child {
          border-radius: 15px 0 0 0;
        }

        .pending-table th:last-child {
          border-radius: 0 15px 0 0;
        }

        .pending-table tbody tr {
          transition: all 0.3s ease;
          border-bottom: 1px solid #f0f2f5;
        }

        .pending-table tbody tr:last-child {
          border-bottom: none;
        }

        .pending-table tbody tr:hover {
          background: rgba(102, 126, 234, 0.05);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .pending-table td {
          padding: 18px 25px;
          color: #4a5568;
          font-size: 1rem;
          border: none;
        }

        /* Badge Styles */
        .user-badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        .role-badge {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border: 1px solid rgba(102, 126, 234, 0.2);
        }

        .status-badge {
          background: rgba(255, 210, 0, 0.1);
          color: #b8860b;
          border: 1px solid rgba(255, 210, 0, 0.2);
        }

        /* Action Buttons */
        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          padding: 10px 22px;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 110px;
          justify-content: center;
        }

        .approve-btn {
          background: linear-gradient(135deg, #4cd964, #2ecc71);
          color: white;
          box-shadow: 0 5px 18px rgba(76, 217, 100, 0.3);
        }

        .approve-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(76, 217, 100, 0.4);
        }

        .reject-btn {
          background: linear-gradient(135deg, #ff6b6b, #ff4757);
          color: white;
          box-shadow: 0 5px 18px rgba(255, 107, 107, 0.3);
        }

        .reject-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
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

        /* Loading Styles */
        .loading-container {
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

        /* Error Styles */
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          padding: 40px;
          text-align: center;
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .pending-users-container {
            margin: 0 30px;
            padding: 30px;
          }
          
          .pending-table {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
          }
        }

        @media (max-width: 992px) {
          .page-container {
            padding-top: 80px;
          }
          
          .pending-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          
          .pending-count {
            align-self: flex-start;
          }
        }

        @media (max-width: 768px) {
          .page-container {
            padding-top: 70px;
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .pending-users-container {
            padding: 25px;
            margin: 0 15px;
          }
          
          .pending-title {
            font-size: 1.8rem;
          }
          
          .pending-table th,
          .pending-table td {
            padding: 15px 18px;
            font-size: 0.95rem;
          }
          
          .action-buttons {
            flex-direction: column;
            gap: 10px;
          }
          
          .action-btn {
            min-width: 100px;
            padding: 8px 18px;
          }
          
          .empty-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .page-container {
            padding-top: 60px;
            padding-left: 10px;
            padding-right: 10px;
          }
          
          .pending-users-container {
            padding: 20px 15px;
            margin: 0;
            border-radius: 15px;
          }
          
          .pending-title {
            font-size: 1.5rem;
          }
          
          .pending-table th,
          .pending-table td {
            padding: 12px 15px;
            font-size: 0.9rem;
          }
          
          .user-badge {
            padding: 6px 12px;
            font-size: 0.85rem;
          }
          
          .action-btn {
            min-width: 90px;
            padding: 8px 15px;
            font-size: 0.85rem;
          }
          
          .empty-icon {
            font-size: 4rem;
          }
          
          .empty-title {
            font-size: 1.3rem;
          }
        }

        /* Header info row */
        .user-info-row {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-name {
          font-weight: 600;
          color: #2c3e50;
        }

        .user-email {
          color: #718096;
          font-size: 0.9rem;
        }
        `}
      </style>

      <div className="page-container">
        <div className="pending-users-container">
          <div className="pending-header">
            <div>
              <h2 className="pending-title">
                Pending <span>User Approvals</span>
              </h2>
              <p style={{ color: '#718096', marginTop: '10px', fontSize: '1rem' }}>
                Review and approve new user registrations
              </p>
            </div>
            <div className="pending-count">
              {pendingUsers.length} {pendingUsers.length === 1 ? 'User' : 'Users'} Pending
            </div>
          </div>
          
          {pendingUsers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3 className="empty-title">No Pending Approvals</h3>
              <p className="empty-message">
                All user registrations have been processed. New registration requests will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="pending-table">
                <thead>
                  <tr>
                    <th>User Details</th>
                    <th>Contact</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div className="user-info-row">
                          <div>
                            <div className="user-name">{user.name || 'N/A'}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.contact || 'N/A'}</td>
                      <td>
                        <span className="user-badge role-badge">
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td>
                        <span className="user-badge status-badge">
                          {user.status || 'pending'}
                        </span>
                      </td>
                      <td>
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'N/A'}
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleApprove(user._id)}
                            className="action-btn approve-btn"
                          >
                            <span>✓</span> Approve
                          </button>
                          <button
                            onClick={() => handleReject(user._id)}
                            className="action-btn reject-btn"
                          >
                            <span>✗</span> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PendingUsers;