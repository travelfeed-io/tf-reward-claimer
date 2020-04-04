if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const privatePostingWif = process.env.TF_POSTING_PRIVATE;

const getPendingRewards = (chain, account) => {
  return chain.api.getAccountsAsync([account]).then(r => {
    const {
      reward_sbd_balance,
      reward_steem_balance,
      reward_vesting_balance,
    } = r[0];
    return { reward_sbd_balance, reward_steem_balance, reward_vesting_balance };
  });
};

const broadcastClaim = (
  chain,
  account,
  reward_sbd_balance,
  reward_steem_balance,
  reward_vesting_balance,
) => {
  chain.broadcast.claimRewardBalance(
    privatePostingWif,
    account,
    reward_steem_balance,
    reward_sbd_balance,
    reward_vesting_balance,
    function(err, result) {
      if (err)
        console.warn(
          `Could not claim rewards balance for ${account}: ${result}`,
        );
      else
        console.log(
          `Claimed rewards balance for ${account}: ${JSON.stringify(result)}`,
        );
    },
  );
};

module.exports = {
  getPendingRewards,
  broadcastClaim,
};
