const Watchlist = require('../models/watchlist');

// Add movie to watchlist
const addToWatchlist = async (req, res) => {
  const userId = req.user.id; // from JWT middleware
  const { movieId } = req.body;

  try {
    const existing = await Watchlist.findOne({ userId, movieId });
    if (existing) return res.status(400).json({ success: false, message: 'Movie already in watchlist' });

    const watchlistItem = new Watchlist({ userId, movieId });
    await watchlistItem.save();

    res.status(201).json({success: true,
      message: 'Movie added to watchlist',
      watchlistItem});
  } catch (err) {
    res.status(500).json({success: false, message: 'An error occurred' });
  }
};

// Get user watchlist
const getWatchlist = async (req, res) => {
  const userId = req.user.id;

  try {
    const watchlist = await Watchlist.find({ userId });
    res.status(200).json({success: true, watchlist, message: 'Watchlist retrieved successfully'});
  } catch (err) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};


// Remove movie from watchlist
const removeFromWatchlist = async (req, res) => {
  const userId = req.user.id;
  const { movieId } = req.params;

  try {
    const result = await Watchlist.findOneAndDelete({ userId, movieId });

    if (!result) {
      return res.status(404).json({ success: false, message: 'Movie not found in watchlist' });
    }

    res.status(200).json({ success: true, message: 'Movie removed from watchlist' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
};


module.exports = {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
};