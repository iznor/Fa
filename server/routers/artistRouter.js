const { Router } = require('express');
const { artistController } = require('../controllers/artistController');

const artistRouter = new Router();

artistRouter.get('/',artistController.getartists);
artistRouter.get('/:id', artistController.getartist); 
// artistRouter.post('/', /*data*/Controller.add/*data*/);
// artistRouter.put('/:id', /*data*/Controller.edit/*data*/);
// artistRouter.delete('/:id', /*data*/Controller.delete/*data*/);

module.exports = { artistRouter};