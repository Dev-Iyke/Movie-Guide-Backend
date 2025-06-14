const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true }, // TMDB movie id
  addedAt: { type: Date, default: Date.now }
}, {Timestamp: true});

module.exports = mongoose.model('Favorite', FavoriteSchema);
