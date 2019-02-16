const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new Schema({
  name: String,
  city: String,
  adress: String,
  phone: String,
  workingTime: String
});


module.exports = mongoose.model('Station', StationSchema);