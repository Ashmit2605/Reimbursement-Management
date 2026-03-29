import pool from "../config/db.js";

export const getUsers = async (companyId) => {
  const result = await pool.query(
    `SELECT id, name, email, role, company_id as "companyId", manager_id as "managerId", created_at as "createdAt" 
     FROM users 
     WHERE company_id = $1`, 
    [companyId]
  );
  return result.rows;
};

export const createUser = async (user) => {
  const { name, email, password, role = 'admin', companyId, managerId = null } = user;
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role, company_id, manager_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, company_id as \"companyId\", manager_id as \"managerId\", created_at as \"createdAt\"",
    [name, email, password, role.toLowerCase(), companyId, managerId]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT *, company_id as \"companyId\", manager_id as \"managerId\", created_at as \"createdAt\" FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const findUserById = async (id) => {
  const result = await pool.query("SELECT *, company_id as \"companyId\", manager_id as \"managerId\", created_at as \"createdAt\" FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const findUserWithCompany = async (id) => {
  const result = await pool.query(
    `SELECT u.id, u.name, u.email, u.role, u.company_id as "companyId", c.name as "companyName", c.logo_url as "companyLogo", u.created_at as "createdAt" 
     FROM users u 
     LEFT JOIN company c ON u.company_id = c.id 
     WHERE u.id = $1`,
    [id]
  );
  return result.rows[0];
};

export const updateUser = async (id, { name, email }) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING name, email",
    [name, email, id]
  );
  return result.rows[0];
};

export const updatePassword = async (id, hashedPassword) => {
  await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, id]);
};

export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
};

export const updateUserRoleAndManager = async (id, { role, managerId }) => {
  const result = await pool.query(
    "UPDATE users SET role = $1, manager_id = $2 WHERE id = $3 RETURNING id, role, manager_id as \"managerId\"",
    [role.toLowerCase(), managerId, id]
  );
  return result.rows[0];
};