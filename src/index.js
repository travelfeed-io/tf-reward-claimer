const { getTrackedUsers } = require('./db/db');

getTrackedUsers().then(users => {
  users.forEach(user => {
    // TODO: Claim rewards balance
    console.log(`Claiming rewards balance for ${user}`);
  });
});
