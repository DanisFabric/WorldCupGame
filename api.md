# API 文档

## 账户

区块链账户有address和privateKey。address是我们对外公开的地址，其他人通过address来进行转账。privagteKey作为自己账户所有权的凭证。当进行交易，涉及到资金变化的时候，需要privateKey坚定身份。

目前所有方法里面，只有addLottery里面需要使用到privateKey，因为只有这个方法是需要提交内容到区块链上，需要进行真实的transaction，会消耗一定的币作为手续费。


## 智能合约

调用智能合约的函数，其实就是向区块链发送交易(transaction)。这里交易分为两种:

1. `neb.api.call`: 仅仅提交到节点，但是不会广播到全网，不消耗币。这里查询数据相关请求都用此方法，也就是说，只需要默认的address进行调用就好。
2. `neb.api.sendRawTransaction`: 发送交易，会广播到全网，会消耗币。只有addLottery会调用此方法，因为其修改了数据

## 属性

nonce: 这是我每次调用都先调用getAccountState的原因，nonce作为一个严格递增的需要，我获取当前账户的序号，然后进行+1，进行递增。

value: 本次交易的币的值。比如转账多少个币。除了addLottery以外的value都为0。addLottery的value就是竞猜金额。这里涉及到一个单位转换，  1 NAS = 10的十次方wei。程序里面是wei为单位，用户层面以nas为单位。

## 综上

除了addLottery以外的接口，都使用默认address没问题。我们提供一个就好。

gasLimit之类的，按照我给的默认值用就好，也没有问题。
