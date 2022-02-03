const Artist = require('../models/artists');
const { infologger, errorlogger } = require("../logs/logs");
exports.artistController = {
    getartist(req, res) {
        infologger.info(`Get Artist number:${req.params.id}`);
        Artist.findOne({ artist_id: req.params.id })
            .then((artist) => {

                if (artist) {
                    infologger.info(`Success to Get information about artist number`);
                    res.json(artist)
                }
                else {
                    errorlogger.error("Wrong artist id please enter correct id");
                    res.status(400).json({ "message": "Wrong artist id please enter correct id" });
                }

            })
            .catch(err => {
                errorlogger.error(`Error Getting artist from db:${err}`);
            });
    },

    getartists(req, res) {
        infologger.info("Get all Artists");
        Artist.find({})
            .then(artists => {
                infologger.info("Success to Get all artists");
                res.json(artists)
            })
            .catch(err => {

                errorlogger.error(`Error getting the data from db:${err}`)
                res.json({ "message": `Error Gets artists ` });

            });
    },
    deleteartist(req, res) {
        infologger.info("Delete a Artist");
        Artist.deleteOne({ artist_id: req.params.id })
            .then((result) => {
                if (result.deletedCount > 0) {
                    infologger.info(`Deleting Artist  is successfully`);
                    res.json({ "message": `Deleting Artist  is successfully` });
                }
                else {
                    errorlogger.error(`Artist no:${req.params.id} does not exists`);
                    res.status(400).json({ "message": `Artist no:${req.params.id} does not exists` });
                }

            })
            .catch(() => {
                errorlogger.error(`Error Deleting Artist no:${req.params.id} `);
                res.status(400).json({ "message": `Error Deleting Artist no:${req.params.id} ` });
            });
    }

}

