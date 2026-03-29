import pool from "../config/db.js";

export const getUsers = async () => {
  const result = await pool.query("SELECT id, name, email, role, created_at FROM users");
  return result.rows;
};

export const createUser = async (user) => {
  const { name, email, password, role = 'Employee' } = user;
  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, password, role]
  );
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};