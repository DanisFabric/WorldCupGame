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
        <div class="title" :style="modalTitleStyle">请选择支持国家球队</div>
        <div class="close" :style="modalCloseStyle" @click="closeAddLotteryModal"></div>
      </header>
      <section class="select-team">
        <div class="group-list">
          <div class="group-item"
            v-for="group in groupList" 
            :class="group.selected ? 'selected' : ''"
            :key="group.key"
            :data-key="group.key"
            @click="selectGroup(group.key)"
          >{{ group.name }}</div>
        </div>
        <div class="team-list">
          <div class="team-item"
            v-for="team in teamList"
            :class="team.selected ? 'selected' : ''"
            :key="team.key"
            :data-key="team.key"
            @click="selectTeam(team.key)"
          >
            <img class="team-flag" :src="team.flag" />
            <div class="team-name">{{ team.name }}</div>
          </div>
        </div>
      </section>
      <section class="hash-section" v-if="hash">
        <div class="hash-title">
          参与成功！
        </div>
        <div class="hash-block">
          <div class="hash-info">
            <span class="field">HASH值：</span>
            <input class="value" :value="hash" disabled>
          </div>
        </div>
      </section>
      <section class="account" v-else-if="isWebExtensionInstalled()">
        <div class="lottery-hint">
          请填入金额参与竞猜，同一个账户只能竞猜一次哦
        </div>
        <input type="text" class="lottery" placeholder="输入投注金额 0.01 ~ 100 NAS" v-model="lottery">
      </section>
      <section class="install" v-else>
        <div class="install-hint">
          你需要一个安全的地方来储存你的资产
        </div>
        <a 
          href="https://github.com/ChengOrangeJu/WebExtensionWallet#webextensionwallet"
          target="_blank"
        >
          <button class="install-button">安装 webExtensionWallet 插件</button>
        </a>
      </section>
      <footer>
        <div 
          class="submit" 
          :style="modalSubmitStyle" 
          @click="submitAddLottery"
        >
          <span>立即参与</span>
        </div>
      </footer>
    </div>
  </div>
</template>
<script>
import numeral from 'numeral';
import nebpay from 'nebpay.js';
import { BreedingRhombusSpinner } from 'epic-spinners';
import { restoreAccountFromKey, parseNas, addLottery } from '../api/index';
import { groups } from '../worldcup';
import { message } from '../utils';
import modalTitleBackground from '../assets/modal-title.png';
import modalCloseBackground from '../assets/modal-close.png';
import modalSubmitBackground from '../assets/modal-submit.png';

const values = require('lodash/values');

console.log({ nebpay });

export default {
  components: { Spinner: BreedingRhombusSpinner },
  data() {
    return {
      groupKey: 'a',
      teamKey: null,
      fileContent: null,
      password: '',
      accountState: null,
      loading: false,
      lottery: '',
      hash: null,
    };
  },
  methods: {
    selectGroup(groupKey) {
      if (groupKey !== this.groupKey) {
        this.teamKey = null;
      }
      this.groupKey = groupKey;
    },
    selectTeam(teamKey) {
      this.teamKey = teamKey;
    },
    closeAddLotteryModal() {
      this.fileContent = null;
      this.password = '';
      this.lottery = '';
      this.accountState = null;
      this.hash = null;

      this.$store.commit('closeAddLotteryModal');
    },
    openFileSelector() {
      const input = this.$refs.file;
      if (input) {
        input.click();
      }
    },
    clearFileSelection() {
      const input = this.$refs.file;
      if (input) {
        input.files.length = 0;
      }
    },
    onFileSelected(fileEvent) {
      const file = fileEvent.target.files[0];
      if (file) {
        const reader = new FileReader(); /* global FileReader */
        // 将文件以文本形式读入页面
        reader.onload = (readEvent) => {
          this.loading = false;
          const content = readEvent.target.result;
          this.fileContent = content;
        };
        reader.onerror = (err) => {
          this.loading = false;
          message.error(`读取文件出错 (${err.message})`);
          console.error(err);
          this.clearFileSelection();
        };
        reader.readAsText(file);
        this.loading = true;
      }
    },
    onSubmitPassword() {
      const key = this.fileContent;
      const pass = this.password;

      this.loading = true;
      restoreAccountFromKey(key, pass).then((accountState) => {
        message.success('导入账号成功');
        this.accountState = accountState;
      }).catch((err) => {
        message.error(`导入账号失败 (${err.message})`);
        console.error(err);
        this.fileContent = null;
        this.password = '';
        this.clearFileSelection();
      }).then(() => {
        this.loading = false;
      });
    },
    submitAddLottery() {
      if (!this.teamKey) {
        message.error('尚未选择球队');
        return;
      }
      if (!this.lottery || !this.lottery.trim()) {
        message.error('尚未输入竞猜金额');
        return;
      }
      if (!/^(?:100(\.0{1,8}?)?|[0-9][0-9]?(\.[0-9]{1,8})?)$/.test(this.lottery)) {
        message.error('请输入0.01~100的数字，最多8位小数');
        return;
      }
      const lottery = Number(this.lottery);
      if (lottery > 100 || lottery < 0.01) {
        message.error('请输入0.01~100的数字，最多8位小数');
        return;
      }
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
      addLottery(this.teamKey, lottery).then((res) => {
        message.success('竞猜提交成功，请稍后查询您的竞猜情况');
        this.hash = res.txhash;
      }).catch((err) => {
        message.error(`竞猜提交失败 (${err.message})`);
        console.error(err);
      });
    },
    isWebExtensionInstalled() {
      return typeof (webExtensionWallet) !== 'undefined';
    },
  },
  computed: {
    groupList() {
      return values(groups).map((group) => {
        const data = {
          selected: group.key === this.groupKey,
        };
        return Object.assign(data, group);
      });
    },
    teamList() {
      const group = groups[this.groupKey];
      const teamList = group ? group.teams : [];
      return teamList.map((team) => {
        const data = {
          selected: team.key === this.teamKey,
        };
        return Object.assign(data, team);
      });
    },
    overlayStyle() {
      const visible = this.$store.state.isAddLotteryModalVisible;
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
    address() {
      const { account } = this.accountState || {};
      if (!account) { return null; }
      return account.getAddressString();
    },
    balance() {
      const { state } = this.accountState || {};
      if (!state) { return null; }
      const balance = parseNas(state.balance);
      return `${numeral(balance).format('0.00000000')} NAS`;
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

    section.select-team {
      padding: 48px 42px 24px;
      border-bottom: 2px solid #F2F2F2;

      .group-list {
        display: flex;
        justify-content: space-between;

        .group-item {
          box-sizing: border-box;
          width: 72px;
          height: 48px;
          border: 2px solid #E6D3A6;
          font-size: 20px;
          line-height: 44px;
          text-align: center;
          user-select: none;
          cursor: pointer;

          &.selected {
            background-color: #E6D3A6;
          }
          &:not(.selected):hover {
            background-color: fadeout(#E6D3A6, 80%);
          }
        }
      }

      .team-list {
        display: flex;
        justify-content: space-around;
        margin-top: 34px;

        .team-item {
          box-sizing: border-box;
          width: 152px;
          height: 152px;
          border: 1px solid #E6D3A6;
          border-radius: 16px;
          background-color: fadeout(#E6D3A6, 80%);
          user-select: none;
          cursor: pointer;

          .team-flag {
            display: block;
            width: 120px;
            height: 86px;
            border-radius: 8px;
            margin: 16px auto 8px;
          }
          .team-name {
            font-size: 20px;
            text-align: center;
          }

          &.selected {
            background-color: fadeout(#E6D3A6, 20%);
          }
          &:not(.selected):hover {
            background-color: fadeout(#E6D3A6, 60%);
          }
        }
      }
    }
    section.hash-section {
      padding: 64px;


      .hash-title {
        margin: 0 auto 30px;
        width: 370px;
        height: 50px;
        box-sizing: border-box;
        font-size: 28px;
        text-align: center;
        font-weight: bold;
      }
      
      .hash-block {
        margin: 0 auto;
        width: 370px;
        height: 50px;
        box-sizing: border-box;

        .hash-info {
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

    section.install {
      padding: 64px;


      .install-hint {
        margin: 0 auto 30px;
        width: 370px;
        height: 50px;
        box-sizing: border-box;
        font-size: 20px;
        text-align: center;
      }
      
      .install-button {
        display: block;
        margin: 0 auto;
        width: 370px;
        height: 50px;
        box-sizing: border-box;
        background-color: #E6D3A6;
        -webkit-appearance: none;
        outline: none;
        border: none;
        font-size: 20px;
        text-align: center;

        &:active {
          background-color: darken(#E6D3A6, 10%);
        }
      }
      a {
        text-decoration: none;
        color: #000000;
      }
    }

    section.account {
      padding: 64px;

      .hash-block {
        margin: -20px auto 30px;
        width: 370px;
        height: 70px;
        box-sizing: border-box;

        .hash-info {
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

      .lottery-hint {
        margin: 0 auto 30px;
        width: 450px;
        height: 50px;
        font-size: 20px;
        text-align: center;
        box-sizing: border-box;
      }

      .account-state {
        margin: -20px auto 30px;
        width: 370px;
        height: 70px;
        box-sizing: border-box;

        .account-info {
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

      .select-file {
        display: flex;
        margin: 0 auto 30px;
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

          &:active {
            background-color: darken(#E6D3A6, 10%);
          }
        }
      }

      .input-group {
        display: flex;
        margin: 0 auto 30px;
        width: 370px;
        height: 50px;
        border: 2px solid #E6D3A6;
        box-sizing: border-box;
        font-size: 20px;
        text-align: center;

        input.password {
          flex: 1;
          display: block;
          height: 100%;
          -webkit-appearance: none;
          outline: none;
          border: none;
          box-sizing: border-box;
          font-size: 20px;
          text-align: center;
        
          &::-webkit-input-placeholder { color: #CCCCCC; }
          &:-ms-input-placeholder { color: #CCCCCC; }
          &::-moz-placeholder { color: #CCCCCC; }
          &:-moz-placeholder { color: #CCCCCC; }
        }

        button {
          width: 100px;
          background-color: #E6D3A6;
          -webkit-appearance: none;
          outline: none;
          border: none;
          font-size: 20px;
          text-align: center;

          &:active {
            background-color: darken(#E6D3A6, 10%);
          }
        }
      }

      input.lottery {
        display: block;
        margin: 0 auto;
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
