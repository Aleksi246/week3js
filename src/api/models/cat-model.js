// Note: db functions are async and must be called with await from the controller
import promisePool from '../../utils/database.js';

const listAllCats = async () => {
  const sql = `SELECT c.cat_id, c.cat_name, c.weight, c.owner, u.name AS owner_name, c.filename, c.birthdate
               FROM wsk_cats c
               LEFT JOIN wsk_users u ON c.owner = u.user_id`;
  const [rows] = await promisePool.execute(sql);
  return rows;
};

const findCatById = async (id) => {
  const sql = `SELECT c.cat_id, c.cat_name, c.weight, c.owner, u.name AS owner_name, c.filename, c.birthdate
               FROM wsk_cats c
               LEFT JOIN wsk_users u ON c.owner = u.user_id
               WHERE c.cat_id = ?`;
  const [rows] = await promisePool.execute(sql, [id]);
  if (rows.length === 0) return null;
  return rows[0];
};

const addCat = async (cat) => {
  const {cat_name, weight, owner, filename, birthdate} = cat;
  const sql = `INSERT INTO wsk_cats (cat_name, weight, owner, filename, birthdate) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  ]);
  if (result.affectedRows === 0) return null;
  return {cat_id: result.insertId};
};

const modifyCat = async (cat, id) => {
  const sql = `UPDATE wsk_cats SET cat_name = ?, weight = ?, owner = ?, filename = ?, birthdate = ? WHERE cat_id = ?`;
  const params = [
    cat.cat_name,
    cat.weight,
    cat.owner,
    cat.filename,
    cat.birthdate,
    id,
  ];
  const [result] = await promisePool.execute(sql, params);
  if (result.affectedRows === 0) return null;
  return {message: 'success'};
};

const removeCat = async (id) => {
  const [result] = await promisePool.execute(
    'DELETE FROM wsk_cats WHERE cat_id = ?',
    [id]
  );
  if (result.affectedRows === 0) return null;
  return {message: 'success'};
};

const listCatsByUser = async (userId) => {
  const sql = `SELECT c.cat_id, c.cat_name, c.weight, c.owner, u.name AS owner_name, c.filename, c.birthdate
               FROM wsk_cats c
               LEFT JOIN wsk_users u ON c.owner = u.user_id
               WHERE c.owner = ?`;
  const [rows] = await promisePool.execute(sql, [userId]);
  return rows;
};

export {listAllCats, findCatById, addCat, modifyCat, removeCat, listCatsByUser};
