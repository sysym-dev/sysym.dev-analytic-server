const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: String,
});

exports.Token = mongoose.model('Token', tokenSchema);
