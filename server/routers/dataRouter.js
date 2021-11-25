const { Router } = require('express');
const { /*data*/Controller } = require('../controllers/dataController');

const /*data*/Router = new Router();

/*data*/Router.get('/', /*data*/Controller.get/*data*/);
/*data*/Router.get('/:id', /*data*/Controller.get/*data*/ById); // localhost:3000/api//*data*//6
/*data*/Router.post('/', /*data*/Controller.add/*data*/);
/*data*/Router.put('/:id', /*data*/Controller.edit/*data*/);
/*data*/Router.delete('/:id', /*data*/Controller.delete/*data*/);

module.exports = { /*data*/Router };