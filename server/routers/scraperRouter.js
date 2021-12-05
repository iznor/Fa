const { Router } = require('express');
const { scraperController } = require('../controllers/scraperController');

const scraperRouter = new Router();

// scraperRouter.get('/', scraperController.getArtist);
// scraperRouter.get('/:id', scraperController.getArtists); 
scraperRouter.post('/',scraperController.addData);
// scraperRouter.put('/:id', scraperController.editArtist);
// scraperRouter.delete('/:id', scraperController.deleteArtist);

module.exports = { scraperRouter };