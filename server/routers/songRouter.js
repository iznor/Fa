const { Router } = require('express');
const { songController } = require('../controllers/songController');

const songRouter = new Router();

songRouter.get('/genre/:id',songController.getsongbygenre);
songRouter.get('/artist/:id', songController.getsongbyartist); 
// artistRouter.post('/', /*data*/Controller.add/*data*/);
// artistRouter.put('/:id', /*data*/Controller.edit/*data*/);
// artistRouter.delete('/:id', /*data*/Controller.delete/*data*/);

module.exports = { songRouter };