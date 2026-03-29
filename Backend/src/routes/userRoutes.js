import express from "express";
import { 
  fetchUsers, 
  getProfile, 
  updateProfile, 
  changePassword,
  addUser,
  removeUser,
  updateUserRole
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch all users for the current organization
router.get("/", authMiddleware, fetchUsers);

// Protected user management routes
router.post("/createuser", authMiddleware, addUser);
router.put("/:id/role", authMiddleware, updateUserRole);
router.delete("/:id", authMiddleware, removeUser);

// Profile routes
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;