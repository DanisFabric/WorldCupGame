const Nebulas = require("nebulas");

const neb = new Nebulas.Neb();

neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));

const address = "n1NEYDpueKsMuy6M3wCThTXwCr6NuCqGS7n";
const contractAddress = "n1zQkQPVYW9UGb7YRxtdjkW4NcZn26QhhW7";

neb.api.getAccountState(address).then(function (state) {
    console.log(state);
    neb.api.call({
        chainID: 1001,
        from: address,
        to: contractAddress,
        value: 0,
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

