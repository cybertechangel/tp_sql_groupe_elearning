import db from '../config/db.js';

// Récupérer tous les utilisateurs
export async function getAllUsers() {
  const [rows] = await db.query('SELECT * FROM users ORDER BY id DESC');
  return rows;
}

// Récupérer un utilisateur par ID
export async function getUserById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0] || null;
}

// Créer un utilisateur
export async function createUser({ name, email }) {
  const [res] = await db.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return { id: res.insertId, name, email };
}

// Supprimer un utilisateur
export async function deleteUser(id) {
  const [res] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return res.affectedRows > 0;
}
