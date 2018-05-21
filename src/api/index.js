
const Nebulas = require('nebulas');
const BigNumber = require('bignumber.js');

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
      nonce: Number.parseInt(state.nonce, 10) + 1,
      gasPrice: GAS_PRICE,
      gasLimit: GAS_LIMIT,
      contract: {
        function: 'getCountries',
        args: '',
      },
    }));
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
        nonce: Number.parseInt(state.nonce, 10) + 1,
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
