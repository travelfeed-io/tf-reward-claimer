const { getTrackedUsers } = require('./db/db');
const { getPendingRewards, broadcastClaim } = require('./steem/steem');

getTrackedUsers().then(users => {
  users.forEach(user => {
    getPendingRewards(user).then(pendingRewards => {
      const {
        reward_sbd_balance,
        reward_steem_balance,
        reward_vesting_balance,
      } = pendingRewards;
      if (
        reward_sbd_balance !== '0.000 SBD' ||
        reward_steem_balance !== '0.000 STEEM' ||
        reward_vesting_balance !== '0.000000 VESTS'
      ) {
        broadcastClaim(
          user,
          reward_sbd_balance,
          reward_steem_balance,
          reward_vesting_balance,
        );
      } else console.log(`Nothing to claim for user ${user}`);
    });
  });
});
