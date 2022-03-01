class ContactController {
  index(request, response) {
    // Listar todos os registros
    response.send('Sent from Contact Controller');
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
