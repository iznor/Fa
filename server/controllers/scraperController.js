const Artist = require('../models/artists');
const Genre = require('../models/genres');
const Song = require('../models/songs');
const { infologger, errorlogger } = require("../logs/logs");
exports.scraperController = {

    addData(req, res) {
        infologger.info("Add a Data");
        // console.log(req.body.artists)
        let flag = false;
        let result = null;
        let newartist = null;
        let newgenre = null;
        let newsong = null;
        for (let i = 0; i < req.body.artists.length; i++) {
            newartist = new Artist({
                "artist_name": req.body.artists[i].artist_name,
                "bio": req.body.artists[i].bio,
                "news": [{ "description": req.body.artists[i].news.description, "link": req.body.artists[i].news.link }],
            });
            result = newartist.save()
            .then(() => {

                infologger.info(`Adding ${req.body.artists[i].artist_name} is successfully`);
                for (let j = 0; j < req.body.artists[i].songs.length; j++) {
                    newgenre = new Genre({
                        "genre_name": req.body.artists[i].songs[j].genre[0],
                    });
                    result = newgenre.save()
                    if (result) {
                        infologger.info(`Adding ${req.body.artists[i].songs[j].genre[0]} is successfully`);
                        // res.json({ "message": `Adding ${req.body.artists.songs[j].genre[0]} is successfully` });
                    }
                    else {
                        errorlogger.error(`Error Adding genre `);
                        res.json({ "message": `Error Adding genre ` });
                    }
                    if (req.body.artists[i].songs[j].genre.length == 2) {
                        newgenre = new Genre({
                            "genre_name": req.body.artists[i].songs[j].genre[1],
                        });
                        result = newgenre.save()
                        if (result) {
                            infologger.info(`Adding ${req.body.artists[i].songs[j].genre[1]} is successfully`);
                            // res.json({ "message": `Adding ${req.body.artists.songs[j].genre[1]} is successfully` });
                        }
                        else {
                            errorlogger.error(`Error Adding genre `);
                            res.json({ "message": `Error Adding genre ` });
                        }
                        flag = true;
                    }
    
                    Artist.findOne().sort('-artist_id').exec((err, item) => {
                        Genre.findOne().sort('-genre_id').exec((err, item1) => {
                          
    
                            if (flag == true) {
                                newsong = new Song({
                                    "song_name": req.body.artists[i].songs[j].song_name,
                                    "artist_id": item.artist_id,
                                    "genre_id_one": item1.genre_id - 1,
                                    "genre_id_two": item1.genre_id,
                                    "relase_date": req.body.artists[i].songs[j].release_date
                                });
                            }
                            else {
                                newsong = new Song({
                                    "song_name": req.body.artists[i].songs[j].song_name,
                                    "artist_id": item.artist_id,
                                    "genre_id_one": item1.genre_id,
                                    "relase_date": req.body.artists[i].songs[j].release_date
                                });
    
                            }
                            result = newsong.save()
                            if (result) {
                                infologger.info(`Adding ${req.body.artists[i].songs[j].song_name} is successfully`);
                                // res.json({ "message": `Adding ${req.body.artists[i].songs[j].song_name} is successfully` });
                            }
                            else {
                                errorlogger.error(`Error Adding song `);
                                res.json({ "message": `Error Adding song ` });
                            }
                        });
    
                    });
    
                    flag = false;
                }

            })
            .catch(err => {
                errorlogger.error(`Error Adding artist `);
                res.json({ "message": `Error Adding artist ` });;
            });
            
            
        }


       res.json({ "message": `Adding songs is successfully` });

    }
}