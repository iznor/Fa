const Song = require('../models/songs');
const { infologger, errorlogger } = require("../logs/logs");
exports.songController = {
    getsongbygenre(req, res) {
        infologger.info(`Get Song by genre:${req.params.id}`);
        Song.find({$or:[{genre_id_one: req.params.id},{genre_id_two: req.params.id}]})
            .then((songbygenre) => {

                if (songbygenre.length>0) {
                    infologger.info(`Success to Get Songs by genre number`);
                    res.json(songbygenre)
                }
                else {
                    errorlogger.error("Wrong genre id please enter correct id");
                    res.status(400).json({ "message": "Wrong genre id please enter correct id" });
                }

            })
            .catch(err => {
                errorlogger.error(`Error Getting song by genre from db:${err}`);
            });
    },

    getsongbyartist(req, res) {
        infologger.info(`Get Song by artist:${req.params.id}`);
        Song.find({ artist_id: req.params.id })
            .then((songbyartist) => {

                if (songbyartist.length>0) {
                    infologger.info(`Success to Get Songs by artist number`);
                    res.json(songbyartist)
                }
                else {
                    errorlogger.error("Wrong artist id please enter correct id");
                    res.status(400).json({ "message": "Wrong artist id please enter correct id" });
                }

            })
            .catch(err => {
                errorlogger.error(`Error Getting song by artist from db:${err}`);
            });
    },


}

