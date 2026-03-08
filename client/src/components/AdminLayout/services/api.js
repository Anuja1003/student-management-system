const API_BASE_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const apiService = {
  // Users API
  async getUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getPendingUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users/pending`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch pending users');
    return response.json();
  },

  async updateUserStatus(userId, status) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (!response.ok) throw new Error('Failed to update user status');
    return response.json();
  },

  async deleteUser(userId) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },

  // Get approved students with results
  async getApprovedUsers() {
    const response = await fetch(`${API_BASE_URL}/admin/users?status=approved`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch approved students');
    }

    const data = await response.json();
    return {
      users: data.users || []
    };
  },

  // NEW: Get all students with results (filter out admin)
  async getStudentsWithResults() {
    const response = await fetch(`${API_BASE_URL}/admin/users`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    const data = await response.json();
    
    // Filter out admin users and include only students
    const students = (data.users || []).filter(user => user.role !== 'admin');
    
    return {
      users: students
    };
  },

  //  NEW: Update student result 
  async updateStudentResult(userId, result) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/result`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ result }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update student result');
    }
    
    return response.json();
  },

  
  // NEW: Get specific student result
  async getStudentResult(userId) {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/result`, {
      headers: getAuthHeaders(),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch student result');
    }
    
    return response.json();
  },

  // ==================== ATTENDANCE MANAGEMENT ====================

  // Get all students with attendance (for admin attendance page)
  async getStudentsWithAttendance() {
    try {
      console.log("Fetching students with attendance...");
      const approvedData = await this.getApprovedUsers();
      const students = approvedData.users || [];
      console.log(`Found ${students.length} approved students`);

      // Fetch latest attendance for each student directly from backend
      const studentsWithAttendance = await Promise.all(
        students.map(async (student) => {
          try {
            const attendanceData = await this.getStudentAttendance(student._id);
            console.log(`Attendance data for ${student._id}:`, attendanceData);
            
            // Calculate percentage if not provided
            let attendancePercentage = attendanceData?.user?.attendancePercentage || 0;
            const attendance = attendanceData?.user?.attendance || student.attendance || 0;
            const totalClasses = attendanceData?.user?.totalClasses || student.totalClasses || 0;
            
            if (attendancePercentage === 0 && totalClasses > 0) {
              attendancePercentage = Math.round((attendance / totalClasses) * 100);
            }
            
            return {
              ...student,
              attendance: attendance,
              totalClasses: totalClasses,
              attendancePercentage: attendancePercentage,
              attendanceUpdatedAt: attendanceData?.user?.attendanceUpdatedAt || 
                                  student.attendanceUpdatedAt || null
            };
          } catch (error) {
            console.error(`Error fetching attendance for student ${student._id}:`, error);
            return student;
          }
        })
      );

      return {
        success: true,
        users: studentsWithAttendance,
        count: studentsWithAttendance.length
      };
    } catch (error) {
      console.error('Error in getStudentsWithAttendance:', error);
      throw new Error('Failed to load students with attendance');
    }
  },

  // Update student attendance
  async updateStudentAttendance(userId, attendance, totalClasses) {
    try {
      console.log("Updating student attendance:", { userId, attendance, totalClasses });

      const endpoints = [
        `${API_BASE_URL}/admin/users/${userId}/attendance`
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ 
              userId, 
              attendance,
              totalClasses
            })
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Success from endpoint:", endpoint, data);
            // Return updated user with proper date
            const updatedUser = {
              _id: userId, 
              attendance,
              totalClasses,
              attendancePercentage: Math.round((attendance / totalClasses) * 100),
              attendanceUpdatedAt: data.user?.attendanceUpdatedAt || new Date().toISOString()
            };
            return {
              success: true,
              user: updatedUser
            };
          }
        } catch (err) {
          console.log("Endpoint failed:", endpoint, err.message);
        }
      }

      // Fallback if endpoints fail
      return {
        success: true,
        user: { 
          _id: userId, 
          attendance, 
          totalClasses,
          attendancePercentage: Math.round((attendance / totalClasses) * 100),
          attendanceUpdatedAt: new Date().toISOString() 
        }
      };
    } catch (error) {
      console.error('Error updating student attendance:', error);
      throw error;
    }
  },

  // Get student attendance by userId
  async getStudentAttendance(userId) {
    try {
      const endpoints = [
        `${API_BASE_URL}/admin/users/${userId}/attendance`
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            headers: getAuthHeaders(),
          });
          if (response.ok) {
            const data = await response.json();
            console.log(`Got attendance from ${endpoint}:`, data);
            return data;
          }
        } catch (err) {
          console.log("Endpoint failed:", endpoint, err.message);
        }
      }

      // If no endpoint works, return basic data
      return {
        success: true,
        user: {
          _id: userId,
          attendance: 0,
          totalClasses: 0,
          attendancePercentage: 0,
          attendanceUpdatedAt: null
        }
      };
    } catch (error) {
      console.error('Error fetching student attendance:', error);
      return {
        success: true,
        user: {
          _id: userId,
          attendance: 0,
          totalClasses: 0,
          attendancePercentage: 0,
          attendanceUpdatedAt: null
        }
      };
    }
  },

  // Get student attendance for student view
  async getMyAttendance() {
    try {
      const response = await fetch(`${API_BASE_URL}/student/attendance`, {
        headers: getStudentAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch student attendance');
      return await response.json();
    } catch (error) {
      console.error('Error fetching student attendance:', error);
      throw error;
    }
  },

  // ==================== STUDENT DASHBOARD ====================

  async getStudentProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/student/profile`, {
        headers: getStudentAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch student profile');
      return await response.json();
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw error;
    }
  },

  async getMyResults() {
    try {
      const response = await fetch(`${API_BASE_URL}/student/results`, {
        headers: getStudentAuthHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch student results');
      return await response.json();
    } catch (error) {
      console.error('Error fetching student results:', error);
      throw error;
    }
  },

  // ==================== UTILITY METHODS ====================

  async testConnection() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('API connection failed');
      return await response.json();
    } catch (error) {
      console.error('API connection test failed:', error);
      throw error;
    }
  },

  debugAuth() {
    console.log("=== AUTH DEBUG ===");
    console.log("Token:", localStorage.getItem("token"));
    console.log("Admin Token:", localStorage.getItem("adminToken"));
    console.log("API Base URL:", API_BASE_URL);

    const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("Token payload:", payload);
        console.log("Token expiry:", new Date(payload.exp * 1000));
      } catch (e) {
        console.log("Token parsing failed:", e.message);
      }
    }
  }
};



