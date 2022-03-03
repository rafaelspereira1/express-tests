const { uuid } = require('uuidv4');

const contacts = [
  {
    id: uuid(),
    name: 'Rafael',
    email: 'rafael@rafael.com',
    phone: '5995555',
    category_id: uuid(),
  },
];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }
}

module.exports = new ContactsRepository();
