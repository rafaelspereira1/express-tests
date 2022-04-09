const db = require('../../database');

class CategoriesRepository {
  async findAll() {
    const rows = await db.query(`
     SELECT * FROM categories ORDER BY name`);
    return rows;
  }

  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *
      `, [name]);
    return row;
  }

  async delete(id) {
    const deleteCategory = await db.query('DELETE from categories WHERE id = $1', [id]);
    return deleteCategory;
  }

  async findbyId(id) {
    const [rows] = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return rows;
  }
}

module.exports = new CategoriesRepository();
