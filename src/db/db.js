require('./connect');
const { Preferences } = require('./models');
const mongoose = require('mongoose');

const getTrackedUsers = async () => {
  return Preferences.find({ claimRewards: true })
    .lean()
    .then(res => {
      mongoose.connection.close();
      return res;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getTrackedUsers,
};
