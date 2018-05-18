<template>
  <div id="situation">
    <div class="container">
      <div class="description">
        <p>《FIFA 18》採用了全新動作系統「真實球員動作科技」，使本遊戲系列大大地踏出創新一步。真實球員動作科技帶來了前所未有的靈敏反應，並且鮮明地展現出球員個性。現在，Cristiano Ronaldo以及其他頂尖球員的一舉一動都將栩栩如真。</p>
      </div>
      <div class="list">
        <div class="item" v-for="item in situation" :key="item.countryName">
          <div class="country">
            <img class="flag" :src="item.countryFlag" />
            <div class="name">{{ item.countryName }}</div>
          </div>
          <div class="progress-container">
            <div class="progress">  
              <div class="progress-bar progress-back">
                <img src="../assets/progress-back.png" alt="">
              </div>
              <div class="progress-bar progress-front" :style="item.progressStyle">
                <img src="../assets/progress-front.png" alt="">
              </div>
            </div>
          </div>
          <div class="percentage-container">
            <div class="percentage">{{ item.progressText }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint global-require: 0 */

import numeral from 'numeral';

const countries = {
  GERMA: {
    name: '德国', flag: require('../assets/flags/de.svg'),
  },
  BRAZI: {
    name: '巴西', flag: require('../assets/flags/br.svg'),
  },
  FRANC: {
    name: '法国', flag: require('../assets/flags/fr.svg'),
  },
};

export default {
  computed: {
    situation() {
      const data = [
        { country: countries.GERMA, progress: 0.945 },
        { country: countries.BRAZI, progress: 0.565 },
        { country: countries.FRANC, progress: 0.345 },
      ];
      const res = data.map(item => ({
        countryName: item.country.name,
        countryFlag: item.country.flag,
        progressText: numeral(item.progress).format('0.0%'),
        progressStyle: `width: ${numeral(item.progress).format('0.0%')}`,
      }));

      return res;
    },
  },
};
</script>
<style lang="less" scoped>
#situation {
  padding: 57px 0 64px;
  background-color: #14396F;
  color: #ffffff;

  .description {
    margin-bottom: 39px;

    p {
      font-size: 20px;
    }
  }

  .item {
    display: flex;
    height: 130px;
  }

  .country {
    padding-top: 30px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    width: 80px;
  }
  img.flag {
    width: 80px;
    height: 57px;
    border-radius: 8px;
  }
  .country .name {
    margin-top: 8px;
  }

  .progress-container {
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    .progress, .progress-bar, .progress-bar img {
      width: 624px;
      height: 24px;
    }
    .progress {
      position: relative;

      .progress-bar {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
      }
    }
  }
  .percentage-container {
    width: 60px;
    display: flex;
    flex-flow: column;
    align-items: flex-end;
    justify-content: center;

    .percentage {
      font-size: 16px;
    }
  }
}
</style>
