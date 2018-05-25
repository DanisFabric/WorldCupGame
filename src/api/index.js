import Nebulas from 'nebulas';
import BigNumber from 'bignumber.js/bignumber';
import { teams, teamKeys } from '../worldcup';

const CHAIN_ID = 1;
const GAS_PRICE = 1000000;
const GAS_LIMIT = 2000000;

const neb = new Nebulas.Neb();

const toBigNumber = value => new BigNumber(value);
const nasToWei = value => toBigNumber(value).times(toBigNumber(10).pow(18));

neb.setRequest(new Nebulas.HttpRequest('https://mainnet.nebulas.io'));

export const contractAddress = 'n1q1C2kZ1L9rJWpJp3xxnuHMsj844VowQ2E';
const internalAccount = {
  address: 'n1FK4UwcQvxV1S6rBw6e1TNW17wDN7ND9e2',
};

export function parseNas(wei) {
  return toBigNumber(wei).div(toBigNumber(10).pow(18)).toNumber();
}

export async function getCountries() {
  return neb.api.getAccountState(internalAccount.address)
    .then(state => neb.api.call({
      chainID: CHAIN_ID,
      from: internalAccount.address,
      to: contractAddress,
      value: 1,
      nonce: Number(state.nonce) + 1,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
      contract: {
        function: 'getCountries',
        args: '',
      },
    }))
    .then(res => JSON.parse(res.result));
}

export async function addLottery(teamKey, account, lottery) {
  const teamId = teamKeys.indexOf(teamKey);
  const address = account.getAddressString();
  const lotteryWei = nasToWei(lottery);
  return neb.api.getAccountState(address)
    .then(state => neb.api.call({
      chainID: CHAIN_ID,
      from: address,
      to: contractAddress,
      value: lotteryWei,
      nonce: Number(state.nonce) + 1,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
      contract: {
        function: 'addLottery',
        args: JSON.stringify([`${teamId}`]),
      },
    })
      .then((res) => {
        if (res.execute_err != null && res.execute_err !== '') {
          throw new Error(res.execute_err);
        }
      })
      .then(() => {
        const tx = new Nebulas.Transaction({
          chainID: CHAIN_ID,
          from: account,
          to: contractAddress,
          value: lotteryWei,
          nonce: Number(state.nonce) + 1,
          gasPrice: GAS_PRICE,
          gasLimit: GAS_LIMIT,
          contract: {
            function: 'addLottery',
            args: JSON.stringify([`${teamId}`]),
          },
        });
        tx.signTransaction();

        return neb.api.sendRawTransaction({
          data: tx.toProtoString(),
        });
      }));
}

export async function getTotalBalance() {
  return neb.api.getAccountState(internalAccount.address)
    .then(state => neb.api.call({
      chainID: CHAIN_ID,
      from: internalAccount.address,
      to: contractAddress,
      value: 0,
      nonce: Number(state.nonce) + 1,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
      contract: {
        function: 'getBalance',
        args: '',
      },
    }))
    .then(res => JSON.parse(res.result));
}

export async function restoreAccountFromKey(key, password) {
  const account = Nebulas.Account.NewAccount();
  account.fromKey(key, password);
  return neb.api.getAccountState(account.getAddressString()).then(state => ({ state, account }));
}

export async function getCountriesBalances() {
  const countries = await getCountries();

  // 如果接口不给比例，则请求总数据进行求比
  if (countries[0].proportion == null) {
    const totalBalance = await getTotalBalance();
    const totalBalanceBN = toBigNumber(totalBalance);
    const totalBalanceIsZero = totalBalanceBN.isZero();
    const result = countries.map(({ index, balance }) => {
      const key = teamKeys[index];
      const team = teams[key];
      if (totalBalanceIsZero) {
        return Object.assign({ index, balance, percentage: 0 }, team);
      }
      const balanceBN = toBigNumber(balance);
      const percentage = balanceBN.div(totalBalanceBN).toNumber();
      return Object.assign({ index, balance, percentage }, team);
    });
    return result;
  }

  const result = countries.map(({ index, balance, proportion }) => {
    const key = teamKeys[index];
    const team = teams[key];
    const percentage = Number(proportion);
    return Object.assign({ index, balance, percentage }, team);
  });

  return result;
}

export async function getLotteryList(page, pageSize) {
  const pageNumber = Number(page) || 1;
  const limit = pageSize;
  const skip = (pageNumber - 1) * limit;

  return neb.api.getAccountState(internalAccount.address)
    .then(state => neb.api.call({
      chainID: CHAIN_ID,
      from: internalAccount.address,
      to: contractAddress,
      value: 0,
      nonce: Number(state.nonce) + 1,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
      contract: {
        function: 'getLotteries',
        args: JSON.stringify([limit, skip]),
      },
    }))
    .then(res => JSON.parse(res.result));
}

export async function checkLottery(address) {
  // n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy
  return neb.api.getAccountState(internalAccount.address)
    .then(state => neb.api.call({
      chainID: CHAIN_ID,
      from: internalAccount.address,
      to: contractAddress,
      value: 0,
      nonce: Number(state.nonce) + 1,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
      contract: {
        function: 'getLottery',
        args: JSON.stringify([address]),
      },
    }))
    .then(res => JSON.parse(res.result));
}
