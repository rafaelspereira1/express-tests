const ContactsRepository = require('../repositories/ContactsController');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  show() {
    // Obter *um* registro
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro existente
  }

  delete() {
    // Deleta um registro existente
  }
}

// Singleton
module.exports = new ContactController();
