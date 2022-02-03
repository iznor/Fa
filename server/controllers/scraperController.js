const Artist = require('../models/artists');
const Genre = require('../models/genres');
const Song = require('../models/songs');
const { infologger, errorlogger } = require("../logs/logs");
exports.scraperController = {

    async addData(req, res) {
        infologger.info("Add a Data");
        let flag = false;
        let result = null;
        let newartist = null;
        let newgenre = null;
        let newsong = null;
        let artistid = 0;
        let genreid = 0;
        let genreid2 = 0;
        let genredata = null;
        let artistdata = null;
        for (let i = 0; i < req.body.artists.length; i++) {
            artistdata = await Artist.findOne({ artist_name: req.body.artists[i].artist_name }).then((artist) => artist)
            if (artistdata) {
                artistid = artistdata.artist_id;
                if (artistdata.bio != req.body.artists[i].bio) {
                    artistdata.bio = req.body.artists[i].bio;
                    Artist.updateOne({ artist_id: artistdata.artist_id }, artistdata)
                        .then((result) => {

                            if (result.matchedCount > 0) {
                                infologger.info(`Updating bio to Artist:${artistid} is successfully`);
                            }
                            else {
                                errorlogger.error("Wrong Artist id please enter correct id");
                                res.status(400).json({ "message": "Wrong Artist id please enter correct id" });
                            }
                        })
                        .catch((err) => res.status(400).json({ "message": `Error update artist ` }));
                }
            } else {

                newartist = new Artist({
                    "artist_name": req.body.artists[i].artist_name,
                    "bio": req.body.artists[i].bio,
                });
                try {
                    result = await newartist.save()
                    artistid = result.artist_id
                    infologger.info(`Adding ${req.body.artists[i].artist_name} is successfully`);

                } catch (err) {
                    errorlogger.error(`Error Adding artist `);
                    res.json({ "message": `Error Adding artist ` });
                    return;
                }
            }

            for (let j = 0; j < req.body.artists[i].songs.length; j++) {
                try {

                    genredata = await Genre.findOne({ genre_name: req.body.artists[i].songs[j].genre[0] }).then((genre) => genre)
                    if (genredata) {
                        genreid = genredata.genre_id;

                    } else {
                        newgenre = new Genre({
                            "genre_name": req.body.artists[i].songs[j].genre[0],
                        });
                        try {
                            result = await newgenre.save()
                            genreid = result.genre_id
                            infologger.info(`Adding ${req.body.artists[i].songs[j].genre[0]} is successfully`);

                        } catch (err) {
                            errorlogger.error(`Error Adding genre `);
                            res.json({ "message": `Error Adding genre ` });
                            return;
                        }
                    }
                }
                catch {
                    errorlogger.error(`Error Adding genre `);
                    res.json({ "message": `Error Adding genre ` });
                    return;
                }
                if (req.body.artists[i].songs[j].genre.length == 2) {
                    try {
                        genredata = await Genre.findOne({ genre_name: req.body.artists[i].songs[j].genre[1] }).then((genre) => genre)
                        if (genredata) {
                            genreid2 = genredata.genre_id;
                        }
                        else {
                            newgenre = new Genre({
                                "genre_name": req.body.artists[i].songs[j].genre[1],
                            });


                            try {
                                result = await newgenre.save()
                                genreid2 = result.genre_id
                            } catch (err) {
                                errorlogger.error(`Error Adding genre `);
                                res.json({ "message": `Error Adding genre ` });
                                return;
                            }
                        }
                    } catch {
                        errorlogger.error(`Error Adding genre `);
                        res.json({ "message": `Error Adding genre ` });
                        return;
                    }

                    flag = true;



                }

                if (flag == true) {
                    newsong = new Song({
                        "song_name": req.body.artists[i].songs[j].song_name,
                        "artist_id": artistid,
                        "genre_id_one": genreid,
                        "genre_id_two": genreid2,
                        "relase_date": req.body.artists[i].songs[j].release_date,
                        "link": req.body.artists[i].songs[j].link,
                        "description": req.body.artists[i].songs[j].description

                    });
                }
                else {
                    newsong = new Song({
                        "song_name": req.body.artists[i].songs[j].song_name,
                        "artist_id": artistid,
                        "genre_id_one": genreid,
                        "relase_date": req.body.artists[i].songs[j].release_date,
                        "link": req.body.artists[i].songs[j].link,
                        "description": req.body.artists[i].songs[j].description
                    });

                }
                try {
                    infologger.info(`Adding ${req.body.artists[i].songs[j].song_name} is successfully`);

                    result = await newsong.save()


                } catch (err) {
                    errorlogger.error(`Error Adding song `);
                    res.json({ "message": `Error Adding song ` });
                    return;
                }
                flag = false;
            }


        }


        res.json({ "message": `Adding songs is successfully` });

    }
}