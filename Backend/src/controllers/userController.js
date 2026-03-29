import bcrypt from "bcryptjs";
import { 
  getUsers, 
  findUserWithCompany, 
  updateUser, 
  updatePassword,
  findUserById,
  createUser,
  deleteUser,
  updateUserRoleAndManager
} from "../models/userModel.js";
import { updateCompany } from "../models/companyModel.js";

// Fetch all users (for management dashboard)
// Fetch all users for the current organization
export const fetchUsers = async (req, res) => {
  try {
    let adminCompanyId = req.user.companyId;

    // Fallback if missing from token
    if (!adminCompanyId) {
      const u = await findUserById(req.user.id);
      adminCompanyId = u ? u.companyId : null;
    }

    const users = await getUsers(adminCompanyId);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch current user's profile and company details
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await findUserWithCompany(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile for current user and their company (if admin)
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, companyName, logoUrl } = req.body;

    // Fetch existing user to get companyId
    const existingUser = await findUserById(userId);
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update user info
    const updatedUser = await updateUser(userId, { name, email });

    // Update company info if role is admin and companyName is provided
    let updatedCompany = null;
    if (existingUser.role === 'admin') {
        updatedCompany = await updateCompany(existingUser.companyId, companyName, logoUrl);
    }

    res.json({
        message: "Profile updated successfully",
        user: {
            ...updatedUser,
            companyName: updatedCompany ? updatedCompany.name : undefined,
            logoUrl: updatedCompany ? updatedCompany.logoUrl : undefined
        }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change password for the logged-in user
export const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect current password" });
        }

        // Hash new password and update
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await updatePassword(userId, hashedPassword);

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, role, managerId } = req.body;
    let companyId = req.user.companyId;

    // Fallback if companyId is missing from token (stale session)
    if (!companyId) {
      const user = await findUserById(req.user.id);
      companyId = user ? user.companyId : null;
    }

    if (!companyId) {
      return res.status(403).json({ message: "Organization ID not found. Please log in again." });
    }

    if (!name || !email || !role) {
      return res.status(400).json({ message: "Name, email, and role are required" });
    }

    // Generate random password
    const tempPassword = Math.random().toString(36).slice(-10);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      role: role.toLowerCase(),
      companyId: companyId,
      managerId: managerId || null
    });

    res.status(201).json({
      message: "User created successfully",
      user: { ...newUser, plainPassword: tempPassword } // Return plain password for showcase
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin removes a user
export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ message: "User removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin updates user role or manager
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role, managerId } = req.body;
    const updated = await updateUserRoleAndManager(id, { role, managerId });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};