const Nebulas = require("nebulas");
const BigNumber = require("bignumber.js");

const neb = new Nebulas.Neb();

neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));

const address = "";
const contractAddress = "n1zzniVioVyqb1cRud8frqM3f1nVo7pPc4Q";

let testAccounts = [
    {address: "n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy", privateKey: "608c2daab9859ae9793aadd2432236df4587803d2b2cf6f37415751ea6b72b1d"},
    {address: "", privateKey: ""},
    {address: "", privateKey: ""},
    {address: "", privateKey: ""}
];

function nasToWei(value) {
    return toBigNumber(value).times(toBigNumber(10).pow(18));
}
function toBigNumber(value) {
    return new BigNumber(value);
}

function getCountries() {
    neb.api.getAccountState(testAccounts[0].address).then(function (state) {
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
                function: "getCountries",
                args: ""
            }
        }).then(function (x) {
           console.log(x);
        }).catch(function (err) {
            console.log(err);
        });
    });
}

function addLottery() {
    neb.api.getAccountState(testAccounts[0].address).then (function (state) {
       console.log(state);
       const account = Nebulas.Account.fromAddress(testAccounts[0].address);
       account.setPrivateKey(testAccounts[0].privateKey);

        const tx = new Nebulas.Transaction({
            chainID: 1001,
            from: account,
            to: contractAddress,
            value: nasToWei(0.1),
            nonce: parseInt(state.nonce) + 1,
            gasPrice: 1000000,
            gasLimit: 2000000,
            contract: {
                function: "addLottery",
                args: '["17"]'
            }
        });
        tx.signTransaction();
        neb.api.sendRawTransaction({
            data: tx.toProtoString()
        }).then(function (hash) {
            console.log("发送成功");
            console.log(hash);
        }).catch(function (reason) {
            console.log("出错了");
            console.log(reason);
        });
    }).catch(function (err) {
        console.log(err);
    });
}

function getAllLotteries() {
    neb.api.getAccountState(testAccounts[0].address).then(function (state) {
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
                function: "getAllLotteries",
                args: ""
            }
        }).then(function (x) {
            console.log(x);
        }).catch(function (err) {
            console.log(err);
        });
    });
}

function getCountryBalanceMap() {
    neb.api.getAccountState(testAccounts[0].address).then(function (state) {
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
                function: "getCountryBalanceMap",
                args: ""
            }
        }).then(function (x) {
            console.log(x);
        }).catch(function (err) {
            console.log(err);
        });
    });
}

function getBalance() {
    neb.api.getAccountState(testAccounts[0].address).then(function (state) {
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
                function: "getBalance",
                args: ""
            }
        }).then(function (x) {
            console.log(x);
        }).catch(function (err) {
            console.log(err);
        });
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
