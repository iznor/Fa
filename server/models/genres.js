const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const genresSchema = new Schema({
    genre_id: { type: Number, index: 1 },
    genre_name: { type: String, required: true },
   
}, { collection: 'genres' });

genresSchema.plugin(AutoIncrement, { inc_field: 'genre_id' });
const Genre = model('genre', genresSchema);
module.exports = Genre;