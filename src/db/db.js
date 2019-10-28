require('./connect');
const { Preferences } = require('./models');
const mongoose = require('mongoose');

const getTrackedUsers = async () => {
  const trackedUsers = [];
  return Preferences.find({ claimRewards: true })
    .then(res => {
      res.forEach(({ user }) => trackedUsers.push(user));
      mongoose.connection.close();
      return trackedUsers;
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  getTrackedUsers,
};
