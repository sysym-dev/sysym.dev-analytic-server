const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({}, { timestamps: true });

exports.Visitor = mongoose.model('Visitor', visitorSchema);
