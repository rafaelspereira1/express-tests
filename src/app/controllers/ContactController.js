const { response } = require('express');
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

  async store(request, response) {
    // Criar novo registro
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name || !email || !phone || !category_id) {
      return response.status(418).json({ Error: 'Data is missing' });
    }

    const contactExists = await ContactsRepository.findbyEmail(email);

    if (contactExists) {
      return response.status(418).json({ Error: 'This e-mail has already been taken' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    // Editar um registro existente
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await ContactsRepository.findbyId(id);
    if (!contactExists) {
      response.status(418).json({ Error: 'User not found' });
    }

    if (!name || !email || !phone || !category_id) {
      return response.status(418).json({ Error: 'Data is missing' });
    }

    const contactByEmail = await ContactsRepository.findbyEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(418).json({ Error: 'This e-mail has already been taken' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, category_id,
    });

    response.json(contact);
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
