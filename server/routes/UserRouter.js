import express from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, updateProfile, forgotPassword, changePassword } from "../controller/UserController.js";


const UserRouter = express.Router();

// routes
UserRouter.post("/register", registerUser); // POST /api/users/register
UserRouter.post("/login", loginUser); // POST /api/users/login
UserRouter.post("/forgot-password", forgotPassword);
UserRouter.post("/changePassword", changePassword);

UserRouter.get("/profile", getUserProfile);
UserRouter.put('/profile', updateProfile);
export default UserRouter;