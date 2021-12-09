const Genre = require('../models/genres');
const { infologger, errorlogger } = require("../logs/logs");
exports.genreController = {
    getGenre(req, res) {
        infologger.info(`Get Genre number:${req.params.id}`);
        Genre.findOne({ genre_id: req.params.id })
            .then((genre) => {

                if (genre) {
                    infologger.info(`Success to Get information about genre number`);
                    res.json(genre)
                }
                else {
                    errorlogger.error("Wrong genre id please enter correct id");
                    res.status(400).json({ "message": "Wrong genre id please enter correct id" });
                }

            })
            .catch(err => {
                errorlogger.error(`Error Getting genre from db:${err}`);
            });
    },

    getGenres(req, res) {
        infologger.info("Get all Genres");
        Genre.find({})
            .then(Genres => {
                infologger.info("Success to Get all Genres");
                res.json(Genres)
            })
            .catch(err => {

                errorlogger.error(`Error getting the data from db:${err}`)
                res.json({ "message": `Error Gets Genres ` });

            });
    },


}

