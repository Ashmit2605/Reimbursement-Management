import pool from "../config/db.js";

export const createCompany = async (name) => {
  const result = await pool.query(
    "INSERT INTO company (name) VALUES ($1) RETURNING id, name, created_at as \"createdAt\"",
    [name]
  );
  return result.rows[0];
};

export const findCompanyById = async (id) => {
  const result = await pool.query("SELECT * FROM company WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateCompany = async (id, name, logoUrl) => {
  const result = await pool.query(
    "UPDATE company SET name = $1, logo_url = $2 WHERE id = $3 RETURNING id, name, logo_url as \"logoUrl\"",
    [name, logoUrl, id]
  );
  return result.rows[0];
};
