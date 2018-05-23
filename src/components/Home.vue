<template>
  <div id="home">
    <section id="main" :style="mainStyle">
        <div class="container">
        <img src="../assets/main-logo.png" alt="" class="main-logo">
        <div class="subtitle">基于区块链的透明公开的足球竞猜</div>
        <div class="buttons">
          <div class="btn btn-left" :style="mainLeftBtnStyle" @click="openAddLotteryModal">立即参与</div>
          <div class="btn btn-left" :style="mainRightBtnStyle">我的竞猜</div>
        </div>
        <div class="count-down">{{ countdown }}</div>
      </div>
    </section>
    <section id="rule">
      <div class="container">
        <img class="fifa-logo" src="../assets/fifa2018.png" alt="FIFA 2018">
        <div class="section-title">竞猜规则</div>
        <div class="rule-content">《FIFA 18》採用了全新動作系統「真實球員動作科技」，使本遊戲系列大大地踏出創新一步。真實球員動作科技帶來了前所未有的靈敏反應，並且鮮明地展現出球員個性。現在，Cristiano Ronaldo以及其他頂尖球員的一舉一動都將栩栩如真。</div>
        <div class="rule-bottom">
          <img src="../assets/rule-bottom.png" alt="- -- -------------">
        </div>
      </div>
    </section>
    <section id="features" :style="featuresStyle">
      <div class="section-title">特点</div>
      <div class="feature-list">
        <div class="feature">
          <img class="feature-logo" src="../assets/feature-transparent.png" alt="transparent">
          <div class="feature-title">公开透明</div>
          <div class="feature-subtitle">信息存储于区块链，完全公开</div>
        </div>
        <div class="feature">
          <img class="feature-logo" src="../assets/feature-unmodifiable.png" alt="unmodifiable">
          <div class="feature-title">不可篡改</div>
          <div class="feature-subtitle">竞猜信息无法被他人篡改</div>
        </div>
        <div class="feature">
          <img class="feature-logo" src="../assets/feature-fair.png" alt="fair">
          <div class="feature-title">公平</div>
          <div class="feature-subtitle">获奖赔率根据算法动态计算</div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import mainBackground from '../assets/main-background.jpg';
import mainLeftBtn from '../assets/btn-green-left.png';
import mainRightBtn from '../assets/btn-white-right.png';
import featuresBackground from '../assets/features-background.jpg';

const deadline = 1528819200000;
const minuteLength = 60000;
const hourLength = 3600000;
const dayLength = 86400000;

export default {
  methods: {
    openAddLotteryModal() {
      this.$store.commit('openAddLotteryModal');
    },
  },
  computed: {
    mainStyle() {
      return `background-image: url(${mainBackground})`;
    },
    mainLeftBtnStyle() {
      return `background-image: url(${mainLeftBtn})`;
    },
    mainRightBtnStyle() {
      return `background-image: url(${mainRightBtn})`;
    },
    featuresStyle() {
      return `background-image: url(${featuresBackground})`;
    },
    countdown() {
      const now = Date.now();
      let diff = deadline - now;
      if (diff <= 0) {
        return '竞猜已经截止';
      }
      const days = Math.floor(diff / dayLength);
      diff -= days * dayLength;
      const hours = Math.floor(diff / hourLength);
      diff -= hours * hourLength;
      const minutes = Math.floor(diff / minuteLength);
      return `竞猜截止倒计时：${days}天${hours}小时${minutes}分钟`;
    },
  },
};
</script>
<style lang="less" scoped>
  #home {
    background-color: darkgray;
  }

  #main {
    padding: 223px 0;
    height: 885px; 
    background-position: center;
    background-size: cover;

    .main-logo {
      display: block;
      margin: 0 auto;
      width: 423px;
      height: 208px;
    }
    .subtitle {
      text-align: center;
      font-size: 24px;
      line-height: 33px;
      margin-top: 25px;
      margin-bottom: 47px;
      user-select: none;
    }
    .buttons {
      display: flex;
      justify-content: center;

      .btn {
        width: 224px;
        height: 64px;
        background-position: center;
        background-size: cover;
        color: #000000;
        text-align: center;
        font-size: 24px;
        line-height: 64px;
        user-select: none;
        cursor: pointer;
      }
    }
    .count-down {
      text-align: center;
      font-size: 20px;
      margin-top: 22px;
      user-select: none;
    }
  }

  .section-title {
    color: #E6D3A6;
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    margin: 8px 0;
  }

  #rule {
    background-color: #ffffff;
    color: #000000;
    height: 599px;
    padding: 80px 0;

    .fifa-logo {
      display: block;
      margin: 0 auto;
      width: 73px;
      height: 80px;
    }
    .rule-content {
      margin-top: 46px;
      font-size: 24px;
      line-height: 38px;
      margin-bottom: 64px;
    }
    .rule-bottom {
      text-align: right;

      img {
        width: 232px;
        height: 16px;
      }
    }
  }

  #features {
    height: 571px;
    padding: 72px;
    
    .feature-list {
      margin-top: 67px;
      display: flex;
      justify-content: center;
      
      .feature {
        width: 296px;
        text-align: center;
        
        .feature-logo {
          display: block;
          margin: 0 auto 24px;
          width: 184px;
          height: 184px;
        }
        .feature-title {
          font-size: 24px;
          line-height: 38px;
          margin-bottom: 5px;
        }
        .feature-subtitle {
          font-size: 18px;
          line-height: 38px;
        }
      }
    }
  }
</style>
