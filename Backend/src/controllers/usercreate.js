// controllers/userController.js
const bcrypt = require("bcryptjs");
const db = require("./config/db"); // your mysql2/promise pool

/**
 * POST /api/users
 * Admin only — creates an Employee, Manager, Finance, or Director account
 * under the same company as the authenticated admin.
 *
 * Body: { name, email, password, role, managerId? }
 */
const addUser = async (req, res) => {
  try {
    const { name, email, password, role, managerId } = req.body;

    // ─── 1. Auth guard ────────────────────────────────────────────────────────
    // req.user is populated by your auth middleware (JWT verify)
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only admins can create users.",
      });
    }

    const companyId = req.user.companyId; // admin's company — injected from JWT

    // ─── 2. Input validation ──────────────────────────────────────────────────
    const VALID_ROLES = ["employee", "manager", "finance", "director"];

    const errors = [];
    if (!name || name.trim().length < 2) {
      errors.push("Name must be at least 2 characters.");
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("A valid email address is required.");
    }
    if (!password || password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }
    if (!role || !VALID_ROLES.includes(role)) {
      errors.push(
        `Role is required and must be one of: ${VALID_ROLES.join(", ")}.`
      );
    }

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // ─── 3. Email uniqueness check ─────────────────────────────────────────
    const [existingUsers] = await db.query(
      "SELECT id FROM Users WHERE email = ?",
      [email.toLowerCase().trim()]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    // ─── 4. Manager validation (optional field) ───────────────────────────────
    let resolvedManagerId = null;

    if (managerId !== undefined && managerId !== null && managerId !== "") {
      const [managerRows] = await db.query(
        `SELECT id, role, companyId FROM Users
         WHERE id = ? AND companyId = ? AND role IN ('manager', 'admin')`,
        [managerId, companyId]
      );

      if (managerRows.length === 0) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid managerId. The manager must exist, belong to your company, and have a manager or admin role.",
        });
      }

      resolvedManagerId = managerId;
    }

    // ─── 5. Hash password ─────────────────────────────────────────────────────
    const hashedPassword = await bcrypt.hash(password, 10);

    // ─── 6. Insert new user ───────────────────────────────────────────────────
    const [result] = await db.query(
      `INSERT INTO Users (name, email, password, role, companyId, managerId)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        email.toLowerCase().trim(),
        hashedPassword,
        role,
        companyId,
        resolvedManagerId,
      ]
    );

    // ─── 7. Fetch the created user (omit password) ────────────────────────────
    const [newUser] = await db.query(
      `SELECT id, name, email, role, companyId, managerId, createdAt
       FROM Users WHERE id = ?`,
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
      user: newUser[0],
    });
  } catch (error) {
    console.error("addUser error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
};

module.exports = { addUser };