const { Router } = require('express');
const { genreController } = require('../controllers/genreController');

const genreRouter = new Router();

genreRouter.get('/',genreController.getGenres);
genreRouter.get('/:id', genreController.getGenre); 
// artistRouter.post('/', /*data*/Controller.add/*data*/);
// artistRouter.put('/:id', /*data*/Controller.edit/*data*/);
// artistRouter.delete('/:id', /*data*/Controller.delete/*data*/);

module.exports = { genreRouter };