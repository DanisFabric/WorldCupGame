<template>
  <div class="overlay" :style="overlayStyle">
    <div class="modal">
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
      <section class="account">
        <div class="btn account">导入账户文件</div>
        <input type="text" class="lottery" placeholder="输入投注金额 0.01 ~ 100 NAS">
      </section>
      <footer></footer>
    </div>
  </div>
</template>
<script>
import { groups } from '../worldcup';
import modalTitleBackground from '../assets/modal-title.png';
import modalCloseBackground from '../assets/modal-close.png';

const values = require('lodash/values');

export default {
  data() {
    return {
      groupKey: 'a',
      teamKey: null,
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
      this.$store.commit('closeAddLotteryModal');
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

    header {
      display: flex;
      justify-content: space-between;

      .title {
        width: 246px;
        height: 48px;
        background-size: contain;
        background-position: center;
        font-size: 20px;
        padding: 8px 16px 12px;
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
            background-color: fadeout(#E6D3A6, 30%);
          }
          &:hover {
            background-color: fadeout(#E6D3A6, 50%);
          }
        }
      }
    }

    section.account {
      padding: 64px;

      input.lottery {
        display: block;
        margin: 0 auto;
        width: 370px;
        height: 64px;
        -webkit-appearance: none;
        outline: none;
        border: 2px solid #E6D3A6;
        box-sizing: border-box;
        font-size: 24px;
        text-align: center;
       
        &::-webkit-input-placeholder { color: #CCCCCC; }
        &:-ms-input-placeholder { color: #CCCCCC; }
        &::-moz-placeholder { color: #CCCCCC; }
        &:-moz-placeholder { color: #CCCCCC; }
      }
    }
  }
}
</style>
