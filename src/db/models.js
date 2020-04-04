const mongoose = require('mongoose');
const { Schema } = mongoose;

const preferencesSchema = new Schema({
  user: { type: String, required: true },
  claimRewards: { type: Boolean, default: false },
  steemUser: { type: String },
  postToSteem: { type: Boolean },
  hiveUser: { type: String },
  postToHive: { type: Boolean },
});

const Preferences = mongoose.model('preferences', preferencesSchema);

module.exports = {
  Preferences,
};
