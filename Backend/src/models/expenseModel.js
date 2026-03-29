import pool from "../config/db.js";

// Employee submits new expense
export const createExpenseModel = async (expense) => {
    const { userId, companyId, type, description, expenseDate, categoryPaidBy, remarks, amount } = expense;
    const result = await pool.query(
        `INSERT INTO Expenses (userId, companyId, type, description, expenseDate, categoryPaidBy, remarks, amount, status) 
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending') 
     RETURNING *`,
        [userId, companyId, type, description, expenseDate, categoryPaidBy, remarks, amount]
    );
    return result.rows[0];
};

// Admin/Manager fetches all company expenses
export const getExpensesByCompany = async (companyId) => {
    const result = await pool.query(
        `SELECT e.*, u.name as "employeeName", u.email as "employeeEmail" 
     FROM Expenses e
     JOIN users u ON e.userId = u.id
     WHERE e.companyId = $1
     ORDER BY e.createdAt DESC`,
        [companyId]
    );
    return result.rows;
};

// Employee fetches their history
export const getExpensesByEmployee = async (userId) => {
    const result = await pool.query(
        `SELECT * FROM Expenses WHERE userId = $1 ORDER BY createdAt DESC`,
        [userId]
    );
    return result.rows;
};

// Update overall expense status
export const updateExpenseStatus = async (expenseId, status, stepsVerified) => {
    await pool.query(
        "UPDATE Expenses SET status = $1, stepsVerified = $2, updatedAt = CURRENT_TIMESTAMP WHERE id = $3",
        [status, stepsVerified, expenseId]
    );
};

// Manage uses this to define who approves at each step
export const setExpenseWorkflowSteps = async (expenseId, steps) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query("DELETE FROM ExpenseApprovalSteps WHERE expenseId = $1", [expenseId]);

        for (const step of steps) {
            await client.query(
                `INSERT INTO ExpenseApprovalSteps (expenseId, stepNumber, assignedUserId, role, status)
                 VALUES ($1, $2, $3, $4, 'pending')`,
                [expenseId, step.stepNumber, step.assignedUserId, step.role]
            );
        }

        await client.query(
            "UPDATE Expenses SET totalSteps = $1, status = 'active' WHERE id = $2",
            [steps.length, expenseId]
        );

        await client.query('COMMIT');
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
};

// Individual step approval
export const updateStepResult = async (stepId, status, comment) => {
    const result = await pool.query(
        `UPDATE ExpenseApprovalSteps 
         SET status = $1, comment = $2, approvedAt = CURRENT_TIMESTAMP 
         WHERE id = $3 
         RETURNING *`,
        [status, comment, stepId]
    );
    return result.rows[0];
};

// Approver gets tasks where it is their turn (stepNumber = stepsVerified + 1)
export const getMyApprovalTasks = async (userId) => {
    const result = await pool.query(
        `SELECT eas.*, e.id as "expenseId", e.description, e.amount, u.name as "employeeName", e.type as "expenseType", e.totalSteps, e.stepsVerified
         FROM ExpenseApprovalSteps eas
         JOIN Expenses e ON eas.expenseId = e.id
         JOIN users u ON e.userId = u.id
         WHERE eas.assignedUserId = $1 AND eas.status = 'pending'
         AND eas.stepNumber = (e.stepsVerified + 1)
         AND e.status = 'active'`,
        [userId]
    );
    return result.rows;
};

// Get the full workflow trail for a specific expense
export const getExpenseWorkflowTrail = async (expenseId) => {
    const result = await pool.query(
        `SELECT eas.*, u.name as "approverName"
         FROM ExpenseApprovalSteps eas
         JOIN users u ON eas.assignedUserId = u.id
         WHERE eas.expenseId = $1
         ORDER BY eas.stepNumber ASC`,
        [expenseId]
    );
    return result.rows;
}

// Finance: Get approved expenses ready for payment
export const getApprovedExpensesForPayment = async (companyId) => {
    const result = await pool.query(
        `SELECT e.*, u.name as "employeeName", u.email as "employeeEmail"
         FROM Expenses e
         JOIN users u ON e.userId = u.id
         WHERE e.companyId = $1 AND e.status = 'approved'
         ORDER BY e.updatedAt DESC`,
        [companyId]
    );
    return result.rows;
}
