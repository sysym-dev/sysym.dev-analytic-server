const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  firstVisitAt: Date,
  lastVisitAt: Date,
});

exports.Visitor = mongoose.model('Visitor', visitorSchema);
