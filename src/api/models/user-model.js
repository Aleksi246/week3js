import promisePool from '../../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM wsk_users');
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute(
    'SELECT * FROM wsk_users WHERE user_id = ?',
    [id]
  );
  if (rows.length === 0) return null;
  return rows[0];
};

const addUser = async (user) => {
  const {name, username, email, role, password} = user;
  const sql = `INSERT INTO wsk_users (name, username, email, role, password) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [
    name,
    username,
    email,
    role,
    password,
  ]);
  return {user_id: result.insertId};
};

const updateUser = async (id, user) => {
  // Fetch existing user to preserve fields not included in the request
  const existing = await findUserById(id);
  if (!existing) return null;

  // Only update fields that are provided in the request (not undefined)
  const {name, username, email, role, password} = user;

  const updateData = {
    name: name !== undefined ? name : existing.name,
    username: username !== undefined ? username : existing.username,
    email: email !== undefined ? email : existing.email,
    role: role !== undefined ? role : existing.role,
    password: password !== undefined ? password : existing.password,
  };

  const sql = `UPDATE wsk_users SET name = ?, username = ?, email = ?, role = ?, password = ? WHERE user_id = ?`;
  const [result] = await promisePool.execute(sql, [
    updateData.name,
    updateData.username,
    updateData.email,
    updateData.role,
    updateData.password,
    id,
  ]);

  if (result.affectedRows === 0) return null;
  return findUserById(id);
};

// Delete user and their cats in a transaction to maintain referential integrity
const deleteUser = async (id) => {
  const conn = await promisePool.getConnection();
  try {
    await conn.beginTransaction();
    // delete cats owned by user
    await conn.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [result] = await conn.execute(
      'DELETE FROM wsk_users WHERE user_id = ?',
      [id]
    );
    await conn.commit();
    conn.release();
    if (result.affectedRows === 0) return null;
    return {user_id: id};
  } catch (err) {
    await conn.rollback();
    conn.release();
    throw err;
  }
};

export {listAllUsers, findUserById, addUser, updateUser, deleteUser};
