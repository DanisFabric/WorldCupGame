import sortBy from 'lodash/sortBy';
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

const contractAddress = 'n1zzniVioVyqb1cRud8frqM3f1nVo7pPc4Q';
const internalAccount = {
  address: 'n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy',
  privateKey: '608c2daab9859ae9793aadd2432236df4587803d2b2cf6f37415751ea6b72b1d',
};

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

export async function addLottery(teamId) {
  return neb.api.getAccountState(internalAccount.address)
    .then((state) => {
      const key = Buffer.from(internalAccount.privateKey, 'hex');
      const account = new Nebulas.Account(key);

      const tx = new Nebulas.Transaction({
        chainID: CHAIN_ID,
        from: account,
        to: contractAddress,
        value: nasToWei(0.1),
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
    });
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


export async function getCountriesBalances() {
  const [countries, totalBalance] = await Promise.all([
    getCountries(), getTotalBalance(),
  ]);
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
