const Favorite = require('../models/favorite');

// Add movie to favorites
const addToFavorites = async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.body;

  try {
    const existing = await Favorite.findOne({ userId, movieId });
    if (existing) return res.status(400).json({success: false, message: 'Movie already in favorites' });

    const favoriteItem = new Favorite({ userId, movieId });
    await favoriteItem.save();

    res.status(201).json({favoriteItem, message: 'Movie added to favorites', success: true});
  } catch (err) {
    res.status(500).json({ success: false, message: 'An error occurred while adding to favorites' });
  }
};

// Get user favorites
const getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const favorites = await Favorite.find({ userId });
    res.status(200).json({ success: true, favorites, message: 'Favorites retrieved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'An error occurred while retrieving favorites' });
  }
};


// Remove movie from favorites
const removeFromFavorites = async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.params;

  try {
    const result = await Favorite.findOneAndDelete({ userId, movieId });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Movie not found in favorites' });
    }

    res.status(200).json({ success: true, message: 'Movie removed from favorites' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};


module.exports = {
  addToFavorites,
  getFavorites,
  removeFromFavorites
};