const routes = require('express').Router();
const controller = require('../controller/controller')

//Category Endpoints
routes.route('/api/categories')
    .post(controller.create_categories)
    .get(controller.get_Categories)

//Transaction Endpoints
routes.route('/api/transaction')
    .post(controller.create_Transaction)
    .get(controller.get_Transaction)
    .delete(controller.delete_Transaction)

//Label Endpoints
routes.route('/api/labels')
    .get(controller.get_Labels)

module.exports = routes;