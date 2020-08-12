const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const LocEntrySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  dateVisited: {
    required: true,
    type: Date,
  },
}, {
  timestamps: true,
});

const LocEntry = mongoose.model('LocEntry', LocEntrySchema);

module.exports = LocEntry;