const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  manufacturer: String,
  model: String,
  year: Number,
  fuelType: String,
  isMechanic: Boolean,
  doorsNumber: Number,
  seatsNumber: Number,
  additionalInfo: []
});


module.exports = mongoose.model('Car', CarSchema);