const { getTrackedUsers } = require('./db/db');
const { getPendingRewards, broadcastClaim } = require('./steem/chainActions');
const steem = require('steem');
const hive = require('steem-js-patched');
const { asyncForEach } = require('tf-post-parser');

hive.api.setOptions({ url: 'https://anyx.io/' });

getTrackedUsers().then(async users => {
  const chains = [];
  users.forEach(user => {
    if (user.postToHive && user.hiveUser)
      chains.push({ user: user.hiveUser, chain: hive });
    if (user.postToSteem && user.steemUser)
      chains.push({ user: user.steemUser, chain: steem });
  });
  await asyncForEach(chains, async ({ user, chain }) => {
    await getPendingRewards(chain, user).then(pendingRewards => {
      const {
        reward_sbd_balance,
        reward_steem_balance,
        reward_vesting_balance,
      } = pendingRewards;
      if (
        reward_sbd_balance.substring(0, 5) !== '0.000' ||
        reward_steem_balance.substring(0, 5) !== '0.000' ||
        reward_vesting_balance !== '0.000000 VESTS'
      ) {
        broadcastClaim(
          chain,
          user,
          reward_sbd_balance,
          reward_steem_balance,
          reward_vesting_balance,
        );
      } else console.log(`Nothing to claim for user ${user}`);
    });
  });
});
