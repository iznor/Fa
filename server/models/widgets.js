const { Schema, model } = require('mongoose');
const widgetSchema = new Schema({
    widget_id: { type: Number, index: 1 },
    artist_id: { type: String },
    genre_id: { type: String },
    news: { type: Boolean },
   

}, { collection: 'widgets' });
const Widget = model('widget', widgetSchema);
module.exports = Widget;