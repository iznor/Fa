const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const songsSchema = new Schema({
    song_id: { type: Number, index: 1 },
    song_name: { type: String, required: true },
    genre_id_one: { type: Number, required: true },
    genre_id_two: { type: Number },
    artist_id: { type: Number, required: true },
    relase_date: { type: String, required: true },
    description: { type: String },
    link: { type: String, required: true }

}, { collection: 'songs' });
songsSchema.plugin(AutoIncrement, { inc_field: 'song_id' });
const Song = model('song', songsSchema);
module.exports = Song;