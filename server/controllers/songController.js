const Song = require('../models/songs');
const { infologger, errorlogger } = require("../logs/logs");
exports.songController = {
    getsongs(req, res) {
        infologger.info("Get all songs");
        Song.find({})
            .then(song => {
                infologger.info("Success to Get all songs");
                res.json(song)
            })
            .catch(err => {

                errorlogger.error(`Error getting the data from db:${err}`)
                res.json({ "message": `Error Gets songs ` });

            });
    },
    getsongbygenre(req, res) {
        infologger.info(`Get Song by Song:${req.params.id}`);
        Song.find({ $or: [{ genre_id_one: req.params.id }, { genre_id_two: req.params.id }] })
            .then((songbySong) => {

                if (songbySong.length > 0) {
                    infologger.info(`Success to Get Songs by Song number`);
                    res.json(songbySong)
                }
                else {
                    errorlogger.error("Wrong Song id please enter correct id");
                    res.status(400).json({ "message": "Wrong Song id please enter correct id" });
                }

            })
            .catch(err => {
                errorlogger.error(`Error Getting song by Song from db:${err}`);
            });
    },

    getsongbyartist(req, res) {
        infologger.info(`Get Song by artist:${req.params.id}`);
        Song.find({ artist_id: req.params.id })
            .then((songbyartist) => {

                if (songbyartist.length > 0) {
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
    deletesong(req, res) {
        infologger.info("Delete a song");
        Song.deleteOne({ song_id: req.params.id })
            .then((result) => {
                if (result.deletedCount > 0) {
                    infologger.info(`Deleting Song  is successfully`);
                    res.json({ "message": `Deleting Song  is successfully` });
                }
                else {
                    errorlogger.error(`Song no:${req.params.id} does not exists`);
                    res.status(400).json({ "message": `Song no:${req.params.id} does not exists` });
                }

            })
            .catch(() => {
                errorlogger.error(`Error Deleting Song no:${req.params.id} `);
                res.status(400).json({ "message": `Error Deleting Song no:${req.params.id} ` });
            });
    }

}

