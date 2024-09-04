const mongoose = require('mongoose');
const dayjs = require('dayjs');

const sessionSchema = new mongoose.Schema({
  startAt: Date,
  lastVisitAt: Date,
  lastLeaveAt: Date,
  unique: Boolean,
  visitor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitor',
  },
  unique: {
    type: Boolean,
    default: true,
  },
});

sessionSchema.virtual('expired').get(function () {
  return dayjs(new Date()).diff(dayjs(this.lastVisitAt)) > 1000 * 60 * 30;
});

exports.Session = mongoose.model('Session', sessionSchema);
