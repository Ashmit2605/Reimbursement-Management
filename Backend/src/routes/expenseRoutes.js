import {
  createExpense,
  fetchMyExpenses,
  fetchAllExpenses,
  defineSequence,
  fetchMyTasks,
  approveStep,
  fetchExpenseTrail,
  fetchApprovedForPayment
} from "../controllers/expenseController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

// Employee: Create and View
router.post("/", authMiddleware, createExpense);
router.get("/me", authMiddleware, fetchMyExpenses);

// Admin/Manager: Manage/Sequence
router.get("/all", authMiddleware, fetchAllExpenses);
router.get("/trail/:id", authMiddleware, fetchExpenseTrail);
router.post("/sequence", authMiddleware, defineSequence);

// Approver: View and Act
router.get("/tasks", authMiddleware, fetchMyTasks);
router.post("/approve", authMiddleware, approveStep);

// Finance: View approved expenses for payment
router.get("/approved-for-payment", authMiddleware, fetchApprovedForPayment);

export default router;
