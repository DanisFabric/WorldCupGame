<template>
  <div class="overlay" :style="overlayStyle">
    <div class="modal">
      <div class="loading" :style="loadingStyle">
        <spinner
          :animation-duration="2000"
          :size="65"
          color="#BBFF33"
        />
      </div>
      <header>
        <div class="title" :style="modalTitleStyle">查询我的竞猜</div>
        <div class="close" :style="modalCloseStyle" @click="closeCheckLotteryModal"></div>
      </header>
      <section class="account">
        <input type="text" class="address" placeholder="请输入你的账户地址" v-model="address">
        <div class="submit">
          <button @click="submit">查 询</button>
        </div>
      </section>
      <section class="response" v-if="response">
        <div class="response-data">
          <div class="item">
            <span class="field">竞猜时间：</span>
            <input class="value" :value="response.time" disabled>
          </div>
          <div class="item">
            <span class="field">竞猜球队：</span>
            <input class="value" :value="response.team.name" disabled>
          </div>
          <div class="item">
            <span class="field">竞猜金额：</span>
            <input class="value" :value="response.valueText" disabled>
          </div>
          <div class="item">
            <span class="field">预期奖励：</span>
            <input class="value" :value="response.expectedBonusText" disabled>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import numeral from 'numeral';
import { BreedingRhombusSpinner } from 'epic-spinners';
import { parseNas, checkLottery } from '../api/index';
import { teams, teamKeys } from '../worldcup';
import { message } from '../utils';
import modalTitleBackground from '../assets/modal-title.png';
import modalCloseBackground from '../assets/modal-close.png';
import modalSubmitBackground from '../assets/modal-submit.png';

export default {
  components: { Spinner: BreedingRhombusSpinner },
  data() {
    return {
      address: '',
      response: null,
      loading: false,
    };
  },
  methods: {
    closeCheckLotteryModal() {
      this.address = '';
      this.response = null;
      this.$store.commit('closeCheckLotteryModal');
    },
    submit() {
      if (!this.address || !this.address.trim()) {
        message.error('尚未输入账号地址');
        return;
      }

      this.loading = true;
      checkLottery(this.address).then((item) => {
        this.loading = false;
        this.response = {
          address: item.address,
          team: teams[teamKeys[item.countryIndex]],
          valueText: `${numeral(parseNas(item.value)).format('0.00000000')} NAS`,
          expectedBonusText: `${numeral(parseNas(item.expectedBonus)).format('0.00000000')} NAS`,
          time: moment(item.timestamp).format('YYYY-MM-DD'),
        };
      }).catch((err) => {
        this.loading = false;
        message.error(`查询竞猜失败 (${err.message})`);
        console.error(err);
      });
    },
  },
  computed: {
    overlayStyle() {
      const visible = this.$store.state.isCheckLotteryModalVisible;
      if (visible) {
        return '';
      }
      return 'display: none;';
    },
    modalTitleStyle() {
      return `background-image: url("${modalTitleBackground}")`;
    },
    modalCloseStyle() {
      return `background-image: url("${modalCloseBackground}")`;
    },
    modalSubmitStyle() {
      return `background-image: url("${modalSubmitBackground}")`;
    },
    loadingStyle() {
      if (this.loading) {
        return '';
      }
      return 'display: none';
    },
  },
};
</script>
<style lang="less" scoped>
.overlay {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: fadeout(#000000, 50%);

  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 800px;
    min-height: 200px;
    background-color: #ffffff;
    color: #000000;
    position: relative;

    .loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: fadeout(#000000, 80%);
    }

    header {
      display: flex;
      justify-content: space-between;

      .title {
        width: 246px;
        height: 48px;
        background-size: contain;
        background-position: center;
        font-size: 20px;
        padding: 8px 42px 12px 16px;
        text-align: center;
      }
      .close {
        width: 84px;
        height: 48px;
        background-size: contain;
        background-position: center;
        cursor: pointer;
      }
    }

    section.response {
      padding: 64px;
      border-top: 2px solid #F2F2F2;


      .response-data {
        margin: 0 auto;
        width: 370px;
        box-sizing: border-box;

        .item {
          display: flex;
          height: 45px;
          align-items: center;
          
          .field {
            flex: 0 0 auto;
            font-size: 20px;
          }
          .value {
            flex: 1;
            overflow-x: scroll;
            background-color: #f7f7f7;
            padding: 0 8px;
            -webkit-appearance: none;
            border: none;
            font-size: 20px;
          }
        }
      }
    }

    section.account {
      padding: 64px;

      input.address {
        display: block;
        margin: 0 auto 30px;
        width: 370px;
        height: 50px;
        -webkit-appearance: none;
        outline: none;
        border: 2px solid #E6D3A6;
        box-sizing: border-box;
        font-size: 20px;
        text-align: center;
       
        &::-webkit-input-placeholder { color: #CCCCCC; }
        &:-ms-input-placeholder { color: #CCCCCC; }
        &::-moz-placeholder { color: #CCCCCC; }
        &:-moz-placeholder { color: #CCCCCC; }
      }


      .submit {
        display: flex;
        margin: 0 auto;
        width: 370px;
        height: 50px;
        border: 2px solid #E6D3A6;
        box-sizing: border-box;
        font-size: 20px;
        text-align: center;

        button {
          width: 100%;
          height: 100%;
          background-color: #E6D3A6;
          -webkit-appearance: none;
          outline: none;
          border: none;
          font-size: 20px;
          text-align: center;
          user-select: none;

          &:active {
            background-color: darken(#E6D3A6, 10%);
          }
        }
      }
    }

    footer {
      height: 96px;
      background-color: #1A1A1A;
      display: flex;
      justify-content: flex-end;

      .submit {
        width: 276px;
        height: 96px;
        background-size: cover;
        background-position: center;
        padding-left: 40px;
        user-select: none;
        cursor: pointer;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 30px;
      }
    }
  }
}

code {
  font-family: 'Consolas', 'Courier New', Courier, monospace;
}
</style>
