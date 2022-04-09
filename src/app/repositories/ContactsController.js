const db = require('../../database');

// const contacts = [
//   {
//     id: v4(),
//     name: 'Rafael',
//     email: 'rafael@rafael.com',
//     phone: '5995555',
//     category_id: v4(),
//   },
// ];

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}`);
    return rows;
  }

  async findbyId(id) {
    const [rows] = await db.query(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1`, [id]);
    return rows;
  }

  async findbyEmail(email) {
    const [rows] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return rows;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE from contacts WHERE id = $1', [id]);
    return deleteOp;
  }

  async create({
    name, email, phone, category_id,
  }) {
    const [row] = await db.query(`
    INSERT INTO contacts(name, email, phone, category_id)
    VALUES($1, $2, $3, $4)
    RETURNING *
    `, [name, email, phone, category_id]);

    return row;
  }

  update(id, {
    name, email, phone, category_id,
  }) {
    const [row] = db.query(`
    UPDATE contacts
    SET name = $1, email = $2, phone = $3, category_id = $4
    WHERE id = $5
    RETURNING *

    `, [name, email, phone, category_id, id]);
    return row;
  }
}

module.exports = new ContactsRepository();
