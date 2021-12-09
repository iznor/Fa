const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const artistsSchema = new Schema({
    artist_id: { type: Number, index: 1 },
    artist_name: { type: String, required: true },
    bio: { type: String },
    news: {
        description: String,
        link: String
    },

}, { collection: 'artists' });
artistsSchema.plugin(AutoIncrement, { inc_field: 'artist_id' });
const Artist = model('artist', artistsSchema);
module.exports = Artist;