class Country {
    index: number;
    nameZh: string;
    nameEn: string;
    icon: string;

    constructor(index, nameZh, nameEn, icon) {
        this.index = index;
        this.nameZh = nameZh;
        this.nameEn = nameEn;
        this.icon = icon;
    }
}

class Lottery {
    address: string;
    countryIndex: string;
    value: BigNumber;
    timestamp: number;

    constructor(address, countryIndex, value) {
        this.address = address;
        this.countryIndex = countryIndex;
        this.value = value;
        this.timestamp = Date.now();
    }
}

class Bonus {
    address: string;
    value: string;

    constructor(address, value) {
        this.address = address;
        this.value = value;
    }
}

function toBigNumber(value: number) {
    return new BigNumber(value);
}

function nasToWei(value: number) {
    return toBigNumber(value).times(toBigNumber(10).pow(18));
}

// 每个address只能进行一次投注
// 查看call和sendTransaction的区别，创建lottery是否直接调用sendTransaction，还是需要提前call一下看看结果


class WorldCupGame {
    // countries: Map<number, Country>;
    // countryLastIndex: number;
    
    // lotteries: Map<number, Lottery>; // address
    // lotteryAddressMap: Map<number, string>;
    // lotteryLastIndex: number;

    // bonusDistribution: Map<number, Bonus>;
    // bonusDistributionIndex: number;
    
    // deadlineDate: number;
    // resultDate: number;
    
    // balance: BigNumber;
    // ownerAddress: string;
    // countryBalanceMap: Map<number, string>

    constructor() {
        LocalContractStorage.defineMapProperty(this, "countries", null);
        LocalContractStorage.defineProperty(this, "countryLastIndex");

        LocalContractStorage.defineMapProperty(this, "lotteries", null);
        LocalContractStorage.defineMapProperty(this, "lotteryAddressMap", null);
        LocalContractStorage.defineProperty(this, "lotteryLastIndex");

        LocalContractStorage.defineMapProperty(this, "bonusDistribution", null);
        LocalContractStorage.defineProperty(this, "bonusDistributionIndex");


        LocalContractStorage.defineProperty(this, "deadlineDate");
        LocalContractStorage.defineProperty(this, "resultDate");

        LocalContractStorage.defineProperty(this, "ownerAddress");
        LocalContractStorage.defineProperty(this, "balance", {
            stringify: function (obj) {
                return obj.toString();
            },
            parse: function (str) {
                return new BigNumber(str);
            }
        });
        LocalContractStorage.defineMapProperty(this, "countryBalanceMap", null);
    }

    init() {
        this.ownerAddress = Blockchain.transaction.from;
        this.balance = new BigNumber(0);

        this.deadlineDate = (new Date(2018, 6, 13, 0, 0, 0)).getTime();
        this.resultDate = (new Date(2018, 7, 20, 0, 0, 0)).getTime();

        this.bonusDistributionIndex = 0;
        this.lotteryLastIndex = 0;
        this.countryLastIndex = 32;

        this.countries.set(0, new Country(0, "俄罗斯", "Russia", "russi"));
        this.countries.set(1, new Country(1, "沙特阿拉伯", "Saudi Arabia", "sarab"));
        this.countries.set(2, new Country(2, "埃及", "Egypt", "egypt"));
        this.countries.set(3, new Country(3, "乌拉圭", "Uruguay", "urugu"));
        this.countries.set(4, new Country(4, "葡萄牙", "Portugal", "portu"));
        this.countries.set(5, new Country(5, "西班牙","Spain", "spain"));
        this.countries.set(6, new Country(6, "摩洛哥", "Morocco", "moroc"));
        this.countries.set(7, new Country(7, "伊朗", "IR Iran" ,"iran"));
        this.countries.set(8, new Country(8, "法国", "France", "franc"));
        this.countries.set(9, new Country(9, "澳大利亚", "Australia", "aus"));
        this.countries.set(10, new Country(10, "秘鲁", "Peru", "peru"));
        this.countries.set(11, new Country(11, "丹麦", "Denmark", "denma"));
        this.countries.set(12, new Country(12, "阿根廷", "Agentina", "argen"));
        this.countries.set(13, new Country(13, "冰岛", "Iceland", "icela"));
        this.countries.set(14, new Country(14, "克罗地亚", "Croatia", "croat"));
        this.countries.set(15, new Country(15, "尼日利亚", "Nigeria", "nigia"));
        this.countries.set(16, new Country(16, "巴西", "Brazil", "brazi"));
        this.countries.set(17, new Country(17, "瑞士", "Switzerland", "switz"));
        this.countries.set(18, new Country(18, "哥斯达尼加", "Costa Rica", "costa"));
        this.countries.set(19, new Country(19, "塞尔维亚", "Serbia", "serbi"));
        this.countries.set(20, new Country(20, "德国", "Germany", "germa"));
        this.countries.set(21, new Country(21, "墨西哥", "Mexico", "mexic"));
        this.countries.set(22, new Country(22, "瑞典", "Sweden", "swede"));
        this.countries.set(23, new Country(23, "韩国", "Korea Republic", "kor"));
        this.countries.set(24, new Country(24, "比利时", "Belgium", "belgi"));
        this.countries.set(25, new Country(25, "巴拿马", "Panama", "panam"));
        this.countries.set(26, new Country(26, "突尼斯", "Tunisia", "tunsi"));
        this.countries.set(27, new Country(27, "英格兰", "England", "uk-ge"));
        this.countries.set(28, new Country(28, "波兰", "Poland", "polan"));
        this.countries.set(29, new Country(29, "塞内加尔", "Senegal", "senga"));
        this.countries.set(30, new Country(30, "哥伦比亚", "Colombia", "colum"));
        this.countries.set(31, new Country(31, "日本", "Japan", "japan"));

        for (let index = 0; index < 32; index ++) {
            this.countryBalanceMap.set(index, "0");
        }
    }
    // 读取截止时间
    getDeadline() {
        return this.deadlineDate;
    }
    getResultDate() {
        return this.resultDate;
    }
    getBalance() {
        return this.balance;
    }
    // 获取国家列表
    getCountries() {
        let totalBalance = this.balance;
        let arr = new Array();
        for (let index = 0; index < this.countryLastIndex; index ++) {
            let country = this.countries.get(index);
            let balance = new BigNumber(this.countryBalanceMap.get(index));
            country.balance = balance;
            if (totalBalance.gt(0)) {
                country.proportion = balance.div(totalBalance);
            } else {
                country.proportion = new BigNumber(0);
            }
            arr.push(country);
        }
        return arr;
    }
    // 获取投注列表
    getLotteries(limit, skip) {
        let start = skip;
        let end = Math.min(skip + limit, this.lotteryLastIndex);
        let balance = this.balance;
        let totalBonus = balance.times(0.95);

        let arr = new Array();
        for (let index = start; index < end; index ++) {
            let key = this.lotteryAddressMap.get(index);
            let lottery = this.lotteries.get(key);
            let value = new BigNumber(lottery.value);
            lottery.expectedBonus = totalBonus.times(value.div(new BigNumber(this.countryBalanceMap.get(lottery.countryIndex))));
            arr.push(lottery);
        }
        return {lotteries: arr, count: this.lotteryLastIndex};
    }
    getAllLotteries() {
        let balance = this.balance;
        let totalBonus = balance.times(0.95);
        let arr = new Array();
        for (let index = 0; index < this.lotteryLastIndex; index ++) {
            let key = this.lotteryAddressMap.get(index);
            let lottery = this.lotteries.get(key);
            let value = new BigNumber(lottery.value);
            lottery.expectedBonus = totalBonus.times(value.div(new BigNumber(this.countryBalanceMap.get(lottery.countryIndex))));
            arr.push(lottery);
        }
        return arr;
    }
    // 根据地址搜索投注信息
    getLottery(address) {
        let lottery = this.lotteries.get(address);
        if (lottery != undefined) {
            let value = new BigNumber(lottery.value);
            let balance = this.balance;
            let totalBonus = balance.times(0.95);
            lottery.expectedBonus = totalBonus.times(value.div(new BigNumber(this.countryBalanceMap.get(lottery.countryIndex))));
        }
        return lottery;
    }
    // 添加投注
    addLottery(countryIndex) {
        if (countryIndex === undefined) {
            throw new Error("必须选择国家");
        }
        let address = Blockchain.transaction.from;
        if (this.lotteries.get(address) != undefined) {
            throw new Error("同个地址不能重复竞猜");
        }
        let value = Blockchain.transaction.value;
        let maxValue = nasToWei(100);
        let minValue = nasToWei(0.01);
        if (value.gt(maxValue) || value.lt(minValue)) {
            throw new Error("竞猜金额应该在 0.01 ~ 100 NAS之间");
        }
        this.lotteryAddressMap.set(this.lotteryLastIndex, address);
        this.lotteries.set(address, new Lottery(address, countryIndex, value));
        let balance = this.balance;
        let newBalance = balance.plus(value);
        this.balance = newBalance;
        this.lotteryLastIndex += 1;

        //
        let countryBalance = new BigNumber(this.countryBalanceMap.get(countryIndex));
        let newCountryBalance = countryBalance.plus(value);
        this.countryBalanceMap.set(countryIndex, newCountryBalance.toString());
    }

    getBonusDistribution() {
        let arr = new Array();
        let bonusCount = this.bonusDistributionIndex;
        for (let index = 0; index < bonusCount; index ++) {
            arr.push(this.bonusDistribution.get(index));
        }
        return arr;
    }
    // 传入比赛结果，传入三个参数是为了多重保证结果没错
    setChampion(countryIndex: number, nameEn: string, nameZh: string) {
        // 提取总金额的5%到owner的账户
        // 计算每个账户能够分配到的金额
        // 在resultDate之后才能进行
        // 只有owner才能执行
        let balance = this.balance;
        if (Blockchain.transaction.from != this.ownerAddress) {
            throw new Error("你不是合约拥有者");
        }
        if (Date.now() < this.resultDate) {
            throw new Error("还未到开奖时间");
        }
        let championCountry = this.countries.get(countryIndex);
        if (championCountry.nameZh != nameZh || championCountry.nameEn != nameEn) {
            throw new Error("国家序号和名称不匹配");
        }

        // 抽取手续费给合约创建者
        let fee = balance.times(0.05);
        Blockchain.transfer(this.ownerAddress, fee);

        // 派发奖金
        let restBalance = balance.minus(fee);

        let championBalance = new BigNumber(this.countryBalanceMap.get(countryIndex)); // 投冠军队的总金额
        let championLotteries = new Array();
        for (let index = 0; index < this.lotteryLastIndex; index ++) {
            let key = this.lotteryAddressMap.get(index);
            let lottery = this.lotteries.get(key);
            if (lottery.countryIndex === countryIndex) {
                championLotteries.push(lottery);
            }
        }
        if (championLotteries.length === 0) {
            Blockchain.transfer(this.ownerAddress, restBalance);
        }  else {
            for (let lottery of championLotteries) {
                let base = new BigNumber(lottery.value);
                let proportion = base.div(championBalance);
                let bonus = restBalance.times(proportion);

                this.bonusDistribution.set(this.bonusDistributionIndex, new Bonus(lottery.address, bonus.toString()));
                this.bonusDistributionIndex += 1;

                Blockchain.transfer(lottery.address, bonus);
            }
        }
    }
}

module.exports = WorldCupGame;