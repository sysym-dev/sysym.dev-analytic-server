const mongoose = require('mongoose');

exports.connect = async () => await mongoose.connect(process.env.DB_URL);
