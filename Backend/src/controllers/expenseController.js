import {
  createExpenseModel,
  getExpensesByCompany,
  getExpensesByEmployee,
  setExpenseWorkflowSteps,
  getMyApprovalTasks,
  updateStepResult,
  updateExpenseStatus,
  getExpenseWorkflowTrail,
  getApprovedExpensesForPayment
} from "../models/expenseModel.js";

// ─── EMPLOYEE ACTIONS ──────────────────────────────────────────────────────

export const createExpense = async (req, res) => {
  try {
    const { type, description, expenseDate, categoryPaidBy, remarks, amount } = req.body;
    const userId = req.user.id;
    const companyId = req.user.companyId;

    if (!type || !amount || !expenseDate) {
      return res.status(400).json({ message: "Type, Amount, and Date are required" });
    }

    const newExpense = await createExpenseModel({
      userId,
      companyId,
      type,
      description,
      expenseDate,
      categoryPaidBy,
      remarks,
      amount
    });

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchMyExpenses = async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await getExpensesByEmployee(userId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── ADMIN / MANAGER SEQUENCE DEFINE ──────────────────────────────────────────

export const fetchAllExpenses = async (req, res) => {
  try {
    const userRole = (req.user.role || "").toString().trim().toLowerCase();
    if (userRole !== 'admin' && userRole !== 'manager') {
        return res.status(403).json({ message: "Access denied. Only admins and managers can view all expenses." });
    }
    const companyId = req.user.companyId;
    const items = await getExpensesByCompany(companyId);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const defineSequence = async (req, res) => {
  try {
    const { expenseId, steps } = req.body; 
    const userRole = (req.user.role || "").toString().trim().toLowerCase();
    if (userRole !== 'admin' && userRole !== 'manager') {
        return res.status(403).json({ message: "Access denied. Only admins or managers can define workflows." });
    }
    await setExpenseWorkflowSteps(expenseId, steps);
    res.json({ message: "Workflow sequence assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ─── APPROVER ACTIONS ──────────────────────────────────────────────────────────

export const fetchMyTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await getMyApprovalTasks(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveStep = async (req, res) => {
  try {
    const { stepId, expenseId, decision, comment, totalSteps, stepsVerified } = req.body;
    await updateStepResult(stepId, decision, comment);

    if (decision === 'rejected') {
        await updateExpenseStatus(expenseId, 'rejected', stepsVerified);
        return res.json({ message: "Request rejected" });
    }

    const nextVerifiedCount = stepsVerified + 1;
    if (nextVerifiedCount >= totalSteps) {
        await updateExpenseStatus(expenseId, 'approved', nextVerifiedCount);
        res.json({ message: "Request fully approved" });
    } else {
        await updateExpenseStatus(expenseId, 'active', nextVerifiedCount);
        res.json({ message: "Step approved, moving to next approver" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchExpenseTrail = async (req, res) => {
    try {
        const userRole = (req.user.role || "").toString().trim().toLowerCase();
        if (userRole !== 'admin' && userRole !== 'manager') {
            return res.status(403).json({ message: "Access denied." });
        }
        const { id } = req.params;
        const trail = await getExpenseWorkflowTrail(id);
        res.json(trail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const fetchApprovedForPayment = async (req, res) => {
    try {
        const userRole = (req.user.role || "").toString().trim().toLowerCase();
        if (userRole !== 'finance') {
            return res.status(403).json({ message: "Access denied. Only finance team can view payment queue." });
        }
        const companyId = req.user.companyId;
        const expenses = await getApprovedExpensesForPayment(companyId);
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
