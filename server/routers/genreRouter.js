const { Router } = require('express');
const { genreController } = require('../controllers/genreController');

const genreRouter = new Router();

genreRouter.get('/',genreController.getGenres);
genreRouter.get('/:id', genreController.getGenre); 
// artistRouter.post('/', /*data*/Controller.add/*data*/);
// artistRouter.put('/:id', /*data*/Controller.edit/*data*/);
genreRouter.delete('/:id', genreController.deletegenre);

module.exports = { genreRouter };