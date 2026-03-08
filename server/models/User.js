import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//Define schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    course: {
        type: String,
        enum: [
            'Master of Computer Application',
            'Master of Business Administrator',
            'Bachelor of Engineering',
            'Mechanical Engineering',
            'Civil Engineering',
            'Computer Science and Engineering',
            'AIDS'
        ],
    },
    year: {
        type: String,
        enum: ['2024', '2025', '2026'],
    },
    contact: {
        type: String,
    },
    status: {
        type: String,
        enum: ["pending", "active", "suspended", "rejected"],
        default: "pending",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    result: {
        type: String,
        default: ""
    },
    // Attendance fields
  attendance: {
    type: Number,
    default: 0,
    min: 0
  },
  totalClasses: {
    type: Number,
    default: 0,
    min: 0
  },
  attendancePercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  attendanceUpdatedAt: {
    type: Date,
  }
   
    
}, {
    timestamps: true
});

//Befor saving hash password

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, 10);
//next();
});

const User = mongoose.model("User", userSchema);
export default User;