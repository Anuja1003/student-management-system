import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';

// -------------------- EMAIL HELPER FUNCTION --------------------
const sendEmail = async ({ to, subject, html }) => {
  if (!to) throw new Error('No recipient specified for email');

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = { 
    from: process.env.EMAIL, 
    to, 
    subject, 
    html 
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return reject(error);
      }
      console.log('Email sent:', info && info.response ? info.response : info);
      resolve(info);
    });
  });
};


// -------------------- USER REGISTRATION --------------------
export const registerUser = async (req, res) => {
  console.log("Welcome to user registration");
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save(); // Password will be hashed automatically by pre-save hook

    // Send welcome email
    try {
      await sendEmail({
        to: newUser.email,
        subject: 'Welcome to Our Service!',
        html: `<p>Hello ${newUser.name},</p>
               <p>Welcome to our service! We're thrilled to have you onboard.</p>
               <p>If you have any questions or need help getting started, feel free to reach out to our support team.</p>
               <p>Best regards,<br>Your Company Name</p>`
      });
    } catch (emailErr) {
      console.error('Failed to send welcome email:', emailErr);
    }

    res.status(201).json({ 
      message: "User registered successfully ✅", 
      user: newUser 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Registration failed ❌", error: error.message });
  }
};

// -------------------- FORGOT PASSWORD --------------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate random 6-digit temporary password
    const tempPassword = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated temp password:", tempPassword);

    // Assign temporary password (will be hashed by pre-save hook)
    user.password = tempPassword;
    await user.save();

    // Send temporary password via email
    const html = `<p>Hello ${user.name},</p>
                  <p>A password reset was requested for your account. Use the temporary password below to log in and then change your password immediately.</p>
                  <p><strong>Temporary password:</strong> ${tempPassword}</p>
                  <p>This temporary password is valid for a limited time. If you did not request this, please contact support immediately.</p>
                  <p>Best regards,<br>Your Company Name</p>`;

    try {
      await sendEmail({ 
        to: user.email, 
        subject: 'Password Reset - Temporary Password', 
        html 
      });
    } catch (emailErr) {
      console.error('forgotPassword email error:', emailErr);
      return res.status(500).json({ message: 'Temporary password created but failed to send email' });
    }

    return res.status(200).json({ message: 'Temporary password sent to your email ✅' });
  } catch (error) {
    console.error('forgotPassword error:', error);
    return res.status(500).json({ message: 'Failed to reset password ❌', error: error.message });
  }
};


// -------------------- USER LOGIN --------------------
export const loginUser = async (req, res) => {
  console.log("User login attempt");
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials ❌" });


    // ✅ CRITICAL: Check if user is approved (status must be "active")
    if (user.role !=="admin" && user.status !== "active") {
      return res.status(403).json({ 
        message: `Your account is ${user.status}. Please wait for admin approval.`
      });
    }

    // Create JWT token for session
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
console.log("Generated JWT Token:", token);
    res.status(200).json({
      message: "Login successful ✅",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed ❌", error: error.message });
  }
};


// -------------------- CHANGE PASSWORD --------------------
export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current and new passwords are required' });
    }

    let user = null;

    // Find user by email or JWT token
    if (email) {
      user = await User.findOne({ email });
    } else {
      const auth = req.headers?.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Email not provided and no authorization token found' });
      }
      const token = auth.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey123');
        user = await User.findById(decoded.id);
      } catch (e) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect ❌' });

    if (user.role !== "admin" && user.status !== "active") {
      return res.status(403).json({ 
        message: `Your account is ${user.status}. Please wait for admin approval.`
      });
    }

    // Set new password (will be hashed by pre-save hook)
    user.password = newPassword;
    await user.save();
    
    return res.status(200).json({ message: 'Password changed successfully ✅' });
  } catch (error) {
    console.error('changePassword error:', error);
    return res.status(500).json({ message: 'Failed to change password ❌', error: error.message });
  }
};

// -------------------- GET ALL USERS --------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      message: "Users fetched successfully ✅",
      users: users
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users ❌", error: error.message });
  }
};

// -------------------- GET USER BY ID --------------------
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User fetched successfully ✅",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user ❌", error: error.message });
  }
};

// -------------------- UPDATE USER PROFILE --------------------
export const updateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    // Remove password from update data if present
    if (updateData.password) {
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User profile updated successfully ✅",
      user: user
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user profile ❌", error: error.message });
  }
};

// -------------------- DELETE USER --------------------
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "User deleted successfully ✅"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user ❌", error: error.message });
  }
};

// -------------------- GET USER PROFILE --------------------
export const getUserProfile = async (req, res) => {
  try {
    // 1️⃣ Get Authorization header
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token required" });
    }

    // 2️⃣ Extract token
    const token = authHeader.split(" ")[1];
    console.log("Received token:", token); // DEBUG: check token in backend

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // 3️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET); // replace with process.env.JWT_SECRET in production
      console.log("Decoded token payload:", decoded); // DEBUG: check payload
    } catch (err) {
      console.error("JWT verification error:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.id;

    // 4️⃣ Fetch user from DB
    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5️⃣ Send user profile
    res.status(200).json({
      message: "Profile retrieved successfully ✅",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        course: user.course,
        year: user.year,
        role: user.role,
        result: user.result || "",
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error("getUserProfile error:", error);
    res.status(500).json({
      message: "Failed to get profile ❌",
      error: error.message
    });
  }
};


// -------------------- UPDATE PROFILE --------------------
// PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    // Get user ID from token
    const auth = req.headers?.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const token = auth.split(' ')[1];
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.id;
    } catch (e) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const { name, email, contact, course, year } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: 'Name, email and contact are required' });
    }

    //Validate course if provided
    if (course) {
      const validCourses = [
        'Master of Computer Application',
        'Master of Business Administrator',
        'Bachelor of Engineering',
        'Mechanical Engineering',
        'Civil Engineering',
        'Computer Science and Engineering',
        'AIDS'
      ];
      if (!validCourses.includes(course)) {
        return res.status(400).json({message: 'Invalid course selected'});
      }
    }

    //Validate if year is provided
    if (year) {
      const validYear = ['2024', '2025', '2026'];

      if (!validYear.includes(year)) {
        return res.status(400).json({message: 'Invalid year selected'});
      }
    }

    // Check if email is being changed and if it's already taken
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (email !== user.email) {
      const emailExists = await User.findOne({ email, _id: { $ne: userId } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    // Update user
    user.name = name;
    user.email = email;
    user.contact = contact || user.contact;
    user.course = course || user.course;
    user.year = year || user.year;
    await user.save();

    // Send response without password
    res.status(200).json({
      message: 'Profile updated successfully ✅',
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact,
        course: user.course,
        year: user.year,
        role: user.role,
        result: user.result || ""
      }
    });
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ message: 'Failed to update profile ❌', error: error.message });
  }
};

// -------------------- GET STUDENT ATTENDANCE --------------------
export const getStudentAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // Calculate percentage if not already stored
    let attendancePercentage = user.attendancePercentage;
    if (user.totalClasses > 0 && user.attendancePercentage === 0) {
      attendancePercentage = Math.round((user.attendance / user.totalClasses) * 100);
    }

    res.status(200).json({
      message: "Student attendance fetched successfully ✅",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        attendance: user.attendance || 0,
        totalClasses: user.totalClasses || 0,
        attendancePercentage: attendancePercentage,
        attendanceUpdatedAt: user.attendanceUpdatedAt || null
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student attendance ❌", error: error.message });
  }
};

// -------------------- UPDATE STUDENT ATTENDANCE --------------------
export const updateStudentAttendance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { attendance, totalClasses } = req.body;

    // Validate inputs
    if (attendance === undefined || totalClasses === undefined) {
      return res.status(400).json({ message: "Attendance and totalClasses are required ❌" });
    }

    if (isNaN(attendance) || isNaN(totalClasses)) {
      return res.status(400).json({ message: "Attendance and totalClasses must be numbers ❌" });
    }

    const attendanceNum = parseInt(attendance);
    const totalClassesNum = parseInt(totalClasses);

    if (attendanceNum < 0 || totalClassesNum < 0) {
      return res.status(400).json({ message: "Values cannot be negative ❌" });
    }

    if (attendanceNum > totalClassesNum) {
      return res.status(400).json({ message: "Attendance cannot be greater than total classes ❌" });
    }

    // Calculate percentage
    const attendancePercentage = totalClassesNum > 0 
      ? Math.round((attendanceNum / totalClassesNum) * 100)
      : 0;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        attendance: attendanceNum,
        totalClasses: totalClassesNum,
        attendancePercentage: attendancePercentage,
        attendanceUpdatedAt: new Date().toISOString()
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    res.status(200).json({
      message: "Student attendance updated successfully ✅",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        attendance: user.attendance,
        totalClasses: user.totalClasses,
        attendancePercentage: user.attendancePercentage,
        attendanceUpdatedAt: user.attendanceUpdatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update student attendance ❌", error: error.message });
  }
};