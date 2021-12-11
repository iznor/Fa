// const { Schema, model } = require('mongoose');
// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);
// const genresSchema = new Schema({
//     widget_id: { type: Number, index: 1 },
//     artist_id: { type: String },
//     user_id: { type: String, required: true },
//     genre_id: { type: String },
//     relase_year: { type: String },

// }, { collection: 'genres' });
// genresSchema.plugin(AutoIncrement, { inc_field: 'genre_id' });
// const Genre = model('genre', genresSchema);
// module.exports = Genre;