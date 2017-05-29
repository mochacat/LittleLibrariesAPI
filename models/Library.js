var mongoose = require('mongoose');

var librarySchema = new mongoose.Schema({
  _id : { type: String , unique: true },
  name: { type: String },
  story: { type: String },
  photo_url: { type: [String] },
  charter: { type: Number , required: true},
  street: { type: String },
  city: { type: String },
  state: { type: String },
  zip: { type: Number },
  country: { type: String },
  coordinates: {
    type: [Number], //latitude, longitude
    index: '2d',
    required: true
  },
  email : { 
    type: String,
    unique: true,
  }, 
  steward_name: { type: String },
  status : { 
    type: Boolean,
    default: true 
  }
});

module.exports = mongoose.model('Library', librarySchema);
