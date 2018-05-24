// neb.js api 文档地址 https://nebulasio.github.io/neb.js/index.html

const Nebulas = require('nebulas');
const BigNumber = require('bignumber.js');

const neb = new Nebulas.Neb();

neb.setRequest(new Nebulas.HttpRequest('https://testnet.nebulas.io'));

const address = '';
const contractAddress = 'n1qZmctYGY1jXcxJMvYyzZZtKrjSZqLbrYD';

const testAccounts = [
  { address: 'n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy', privateKey: '608c2daab9859ae9793aadd2432236df4587803d2b2cf6f37415751ea6b72b1d' },
  { address: '', privateKey: '' },
  { address: '', privateKey: '' },
  { address: '', privateKey: '' },
];

function nasToWei(value) {
  return toBigNumber(value).times(toBigNumber(10).pow(18));
}
function toBigNumber(value) {
  return new BigNumber(value);
}

function getCountries() {
  neb.api.getAccountState(testAccounts[0].address).then((state) => {
    console.log(state);
    neb.api.call({
      chainID: 1001,
      from: testAccounts[0].address,
      to: contractAddress,
      value: 1,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'getCountries',
        args: '',
      },
    }).then((x) => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  });
}

function addLottery() {

  // const account = Nebulas.Account.fromAddress(testAccounts[0].address);
  // account.setPrivateKey(testAccounts[0].privateKey);

  const account = new Nebulas.Account(new Buffer("861ec7e9df55736b5a0caf60a9380a344b88e1aa804f3ee18d644d07d816b7e1", 'hex'));
  
  neb.api.getAccountState(account.getAddressString()).then((state) => {
    console.log(state);
    
    neb.api.call({
      chainID: 1001,
      from: account.getAddressString(),
      to: contractAddress,
      value: nasToWei(0.01),
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'addLottery',
        args: '["17"]',
      },
    }).then((x) => {
      console.log(x);
      if (x.execute_err != null && x.execute_err != "") {
        console.log("调用出错了，不进行transaction");
        return ;
      } 
      const tx = new Nebulas.Transaction({
        chainID: 1001,
        from: account,
        to: contractAddress,
        value: nasToWei(0.01),
        nonce: parseInt(state.nonce) + 1,
        gasPrice: 1000000,
        gasLimit: 2000000,
        contract: {
          function: 'addLottery',
          args: '["17"]',
        },
      });
      tx.signTransaction();
      neb.api.sendRawTransaction({
        data: tx.toProtoString(),
      }).then((hash) => {
        console.log('发送成功');
        console.log(hash);
      }).catch((reason) => {
        console.log('出错了');
        console.log(reason);
      });
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
      console.log(err);
  });
}

function getAllLotteries() {
  neb.api.getAccountState(testAccounts[0].address).then((state) => {
    console.log(state);
    neb.api.call({
      chainID: 1001,
      from: testAccounts[0].address,
      to: contractAddress,
      value: 0,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'getAllLotteries',
        args: '',
      },
    }).then((x) => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  });
}

function getLotteries() {
  neb.api.getAccountState(testAccounts[0].address).then((state) => {
    console.log(state);
    neb.api.call({
      chainID: 1001,
      from: testAccounts[0].address,
      to: contractAddress,
      value: 0,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'getLotteries',
        args: '[3,0]',
      },
    }).then((x) => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  });
}

function getCountryBalanceMap() {
  neb.api.getAccountState(testAccounts[0].address).then((state) => {
    console.log(state);
    neb.api.call({
      chainID: 1001,
      from: testAccounts[0].address,
      to: contractAddress,
      value: 0,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'getCountryBalanceMap',
        args: '',
      },
    }).then((x) => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  });
}

function getBalance() {
  neb.api.getAccountState(testAccounts[0].address).then((state) => {
    console.log(state);
    neb.api.call({
      chainID: 1001,
      from: testAccounts[0].address,
      to: contractAddress,
      value: 0,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'getBalance',
        args: '',
      },
    }).then((x) => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  });
}

function searchLottery() {
  // n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy
  neb.api.getAccountState(testAccounts[0].address).then((state) => {
    console.log(state);
    neb.api.call({
      chainID: 1001,
      from: testAccounts[0].address,
      to: contractAddress,
      value: 0,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'getLottery',
        args: '["n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy"]',
      },
    }).then((x) => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  });
}

function setChampion() {
  const account = new Nebulas.Account("861ec7e9df55736b5a0caf60a9380a344b88e1aa804f3ee18d644d07d816b7e1", 'hex');
  neb.api.getAccountState(account.getAddressString()).then((state) => {
    console.log(state);


    const tx = new Nebulas.Transaction({
      chainID: 1001,
      from: account,
      to: contractAddress,
      value: 0,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'setChampion',
        args: '["17", "Switzerland", "瑞士"]',
      },
    });
    tx.signTransaction();
    neb.api.sendRawTransaction({
      data: tx.toProtoString(),
    }).then((hash) => {
      console.log('发送成功');
      console.log(hash);
    }).catch((reason) => {
      console.log('出错了');
      console.log(reason);
    });
  }).catch((err) => {
    console.log(err);
  });
}

// 获得开奖结果，这个是随着设置冠军把钱发了之后，才生成的数据
function getBonusDistribution() {
  neb.api.getAccountState(testAccounts[0].address).then((state) => {
    console.log(state);
    neb.api.call({
      chainID: 1001,
      from: testAccounts[0].address,
      to: contractAddress,
      value: 0,
      nonce: parseInt(state.nonce) + 1,
      gasPrice: 1000000,
      gasLimit: 2000000,
      contract: {
        function: 'getBonusDistribution',
        args: '',
      },
    }).then((x) => {
      console.log(x);
    }).catch((err) => {
      console.log(err);
    });
  });
}

function testAccount() {
  let account = Nebulas.Account.NewAccount();
  console.log(account.getAddressString());
  console.log(account.getPrivateKeyString());
  account.fromKey('{"version":4,"id":"cdb70f51-0a65-4960-a00d-79f6eef79e94","address":"n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy","crypto":{"ciphertext":"a5b4848a4d52f50857bcd918d3a0d8ee9b57303f53f9fdd1006479c27d108e9b","cipherparams":{"iv":"731d38dbc7375d724956e9ea06da6900"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"bce075d7fa8342f959a676cb14eaa1eb8f23b702ae6ab5ec2faf0639394beb16","n":4096,"r":8,"p":1},"mac":"595a5565cfe55ffb5b23f50bff64b3049cde2efe07ff18c90f1c61acc5856eac","machash":"sha3256"}}', "passphrase")
  neb.api.getAccountState(account.getAddressString()).then((state) => {
    console.log(state);
  });
}

// 获取国家列表
// getCountries();

// 提交竞猜信息
// addLottery();

// 获取所有竞猜列表
// getAllLotteries();

// 获得当前合约总竞猜金额
// getBalance();

// 根据address搜索lottery
// searchLottery();

// 设置冠军
// setChampion();

// 获取奖金分配
// getBonusDistribution();

// testAccount();
getLotteries();