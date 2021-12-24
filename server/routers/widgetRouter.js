const { Router } = require('express');
const { widgetController } = require('../controllers/widgetController');

const widgetRouter = new Router();

widgetRouter.get('/:id',widgetController.getwidget);
widgetRouter.get('/', widgetController.getwidgets); 
widgetRouter.post('/', widgetController.addwidget);
widgetRouter.patch('/:id', widgetController.editwidget);
widgetRouter.delete('/:id', widgetController.deletewidget);

module.exports = { widgetRouter };