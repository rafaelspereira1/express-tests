class CategoryController {
  index(request, response) {
    response.send('ok - index');
  }
}

module.exports = new CategoryController();
