const Nebulas = require("nebulas");
const BigNumber = require("bignumber.js");

const neb = new Nebulas.Neb();

neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));

const address = "n1b18cYuzp2bS14KPwC7cyF38Pe4JHaJKdy";
const contractAddress = "n1zQkQPVYW9UGb7YRxtdjkW4NcZn26QhhW7";

function nasToWei(value) {
    return toBigNumber(value).times(toBigNumber(10).pow(18));
}
function toBigNumber(value) {
    return new BigNumber(value);
}


function readCountries() {
    neb.api.getAccountState(address).then(function (state) {
        console.log(state);
        neb.api.call({
            chainID: 1001,
            from: address,
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
    neb.api.getAccountState(address).then (function (state) {
       console.log(state);
       const account = Nebulas.Account.fromAddress(address);
       account.setPrivateKey("608c2daab9859ae9793aadd2432236df4587803d2b2cf6f37415751ea6b72b1d");

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
    
}

// function unlockAccount() {
//     neb.admin.unlockAccount({
//         address: address,
//         passphrase: "danis12315",
//         duration: 10000000000
//     }).then (function (isUnlocked) {
//         console.log(isUnlocked);
//     }).catch(function (err) {
//         console.log(err);
//     });
// }

// readCountries();
// unlockAccount();
// addLottery();