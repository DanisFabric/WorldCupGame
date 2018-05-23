<template>
  <div id="situation">
    <div class="container">
      <div class="description">
        <p>当前各国家队的支持情况，柱状图为您提供了不同国家的竞猜资金占总资金的比例</p>
      </div>
      <div class="list" v-if="loaded">
        <div class="item" v-for="item in data" :key="item.name">
          <div class="team">
            <img class="flag" :src="item.flag" />
            <div class="name">{{ item.name }}</div>
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
      <div class="list loading" v-else>
        <spinner
          :animation-duration="2000"
          :size="65"
          color="#BBFF33"
        />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint global-require: 0 */

import _ from 'lodash';
import numeral from 'numeral';
import { BreedingRhombusSpinner } from 'epic-spinners';
import { teams } from '../worldcup';
import { getCountriesBalances } from '../api/index';


export default {
  components: { Spinner: BreedingRhombusSpinner },
  mounted() {
    this.loaded = false;
    getCountriesBalances()
      .then((data) => {
        this.loaded = true;
        const prettyData = _(data).orderBy(['percentage', 'index'], ['desc', 'asc'])
          .value()
          .map((item) => {
            const extra = {};
            extra.progressText = numeral(item.percentage).format('0.0%');
            extra.progressStyle = `width: ${extra.progressText}`;
            return Object.assign(extra, item);
          });
        this.data.length = 0;
        this.data.push(...prettyData);
        console.log(data, prettyData, this.data.length);
      });
  },

  data() {
    return {
      loaded: false,
      data: [],
    };
  },

  computed: {
    situation() {
      const data = [
        { team: teams.de, progress: 0.945 },
        { team: teams.br, progress: 0.565 },
        { team: teams.fr, progress: 0.345 },
      ];
      const res = data.map(item => ({
        teamName: item.team.name,
        teamFlag: item.team.flag,
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

  .list.loading {
    height: 390px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item {
    display: flex;
    height: 130px;
  }

  .team {
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
  .team .name {
    margin-top: 8px;
  }

  .progress-container {
    flex: 1;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 130px;

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
