const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    // Lista todos os registros
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    // Cria um novo registro
    const { name } = request.body;

    if (!name) {
      return response.status(418).json({ Error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async show(request, response) {
    // Obter *um* registro
    const { id } = request.params;

    const categories = await CategoriesRepository.findbyId(id);

    if (!categories) {
      return response.status(404).json({ Error: 'Category not Found' });
    }
    return response.json(categories);
  }

  async delete(request, response) {
    // Deleta um registro existente
    const { id } = request.params;

    const categories = await CategoriesRepository.findbyId(id);

    if (!categories) {
      return response.status(404).json({ Error: 'Category not Found' });
    }
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
