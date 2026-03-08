import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  // Add your admin verification logic here
  next();
};

// Get all users (admin only)
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    //const users = await User.find({ status: "active" }, '-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get pending users only
router.get('/users/pending', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' }, '-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error('Error fetching pending users:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});


// Update user status
router.put('/users/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Delete User
router.delete('/users/:id', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      // Return success instead of 404 for better UX
      return res.json({ success: true, message: 'User not found or already deleted' });
    }
    
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Update user result
router.put('/users/:id/result', async (req, res) => {
  try {
    const { result } = req.body;
    
    // Check if user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update result field
    user.result = result;
    await user.save();
    
    // Return updated user without password
    const updatedUser = await User.findById(user._id).select('-password');
    res.json({ 
      message: 'Result updated successfully', 
      user: updatedUser 
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET student attendance (admin only)
router.get('/users/:id/attendance', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    // Calculate attendance percentage
    let attendancePercentage = user.attendancePercentage || 0;
    if (user.totalClasses > 0 && (user.attendancePercentage === 0 || user.attendancePercentage === undefined)) {
      attendancePercentage = Math.round((user.attendance / user.totalClasses) * 100);
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        attendance: user.attendance || 0,
        totalClasses: user.totalClasses || 0,
        attendancePercentage: attendancePercentage,
        attendanceUpdatedAt: user.attendanceUpdatedAt || null
      }
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// ✅ UPDATE student attendance (admin only)
router.put('/users/:id/attendance', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { attendance, totalClasses } = req.body;

    if (attendance === undefined || totalClasses === undefined) {
      return res.status(400).json({ success: false, error: 'Attendance and totalClasses are required' });
    }

    // Convert to numbers
    const attendanceNum = parseInt(attendance);
    const totalClassesNum = parseInt(totalClasses);

    // Validate inputs
    if (isNaN(attendanceNum) || isNaN(totalClassesNum)) {
      return res.status(400).json({ success: false, error: 'Attendance and totalClasses must be valid numbers' });
    }

    if (attendanceNum < 0 || totalClassesNum < 0) {
      return res.status(400).json({ success: false, error: 'Values cannot be negative' });
    }

    if (attendanceNum > totalClassesNum) {
      return res.status(400).json({ success: false, error: 'Attendance cannot be greater than total classes' });
    }

    // Calculate attendance percentage
    const attendancePercentage = totalClassesNum > 0 
      ? Math.round((attendanceNum / totalClassesNum) * 100)
      : 0;

    // Update user attendance
    const user = await User.findByIdAndUpdate(
      id,
      {
        attendance: attendanceNum,
        totalClasses: totalClassesNum,
        attendancePercentage: attendancePercentage,
        attendanceUpdatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        attendance: user.attendance,
        totalClasses: user.totalClasses,
        attendancePercentage: user.attendancePercentage,
        attendanceUpdatedAt: user.attendanceUpdatedAt
      }
    });
  } catch (error) {
    console.error('Error updating attendance:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

export default router;