import Nebulas from 'nebulas';
import BigNumber from 'bignumber.js/bignumber';
import { teams, teamKeys } from '../worldcup';

const CHAIN_ID = 1001;
const GAS_PRICE = 1000000;
const GAS_LIMIT = 2000000;

const neb = new Nebulas.Neb();

const toBigNumber = value => new BigNumber(value);
const nasToWei = value => toBigNumber(value).times(toBigNumber(10).pow(18));

neb.setRequest(new Nebulas.HttpRequest('https://testnet.nebulas.io'));

const contractAddress = 'n1m4HMV8jkje5eBwZ3cSVtJuUEnoiBJt4q5';
const internalAccount = {
  address: 'n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy',
  privateKey: '608c2daab9859ae9793aadd2432236df4587803d2b2cf6f37415751ea6b72b1d',
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
      chainID: 1001,
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
          chainID: 1001,
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
      chainID: 1001,
      from: internalAccount.address,
      to: contractAddress,
      value: 0,
      nonce: Number(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
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
  console.log({ countries });

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
