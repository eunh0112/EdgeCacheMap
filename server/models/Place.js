// models/Place.js
const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  category: String,
  description: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Place', placeSchema);
