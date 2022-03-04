const ContactsRepository = require('../repositories/ContactsController');

class ContactController {
  async index(request, response) {
    // Listar todos os registros
    const contacts = await ContactsRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    // Obter *um* registro
    const { id } = request.params;

    const contact = await ContactsRepository.findbyId(id);

    if (!contact) {
      return response.status(404).json({ Error: 'User not Found' });
    }
    response.json(contact);
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro existente
  }

  async delete(request, response) {
    // Deleta um registro existente
    const { id } = request.params;

    const contact = await ContactsRepository.findbyId(id);

    if (!contact) {
      return response.status(404).json({ Error: 'User not Found' });
    }
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
