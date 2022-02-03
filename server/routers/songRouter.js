const { Router } = require('express');
const { songController } = require('../controllers/songController');

const songRouter = new Router();

songRouter.get('/genre/:id',songController.getsongbygenre);
songRouter.get('/artist/:id', songController.getsongbyartist); 
songRouter.get('/', songController.getsongs); 
// artistRouter.post('/', /*data*/Controller.add/*data*/);
// artistRouter.put('/:id', /*data*/Controller.edit/*data*/);
songRouter.delete('/:id', songController.deletesong);

module.exports = { songRouter };