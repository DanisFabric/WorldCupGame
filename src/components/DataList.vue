<template>
  <div id="data-list">
    <div class="container">
      <div class="description">
        <p>您能够在当前页面查询到所有的竞猜信息。并且所有数据存储于区块链，本网站无法改动竞猜数据。</p>
      </div>
      <div class="list" :style="listStyle" v-if="list">
        <table>
          <thead>
            <tr>
              <th>地址</th>
              <th>球队</th>
              <th>金额</th>
              <th>预期奖励</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.address">
              <td :title="item.address">
                {{ item.address }}
              </td>
              <td :title="item.team.name">
                {{ item.team.name }}
              </td>
              <td :title="item.valueText">
                {{ item.valueText }}
              </td>
              <td :title="item.expectedBonusText">
                {{ item.expectedBonusText }}
              </td>
              <td :title="item.time">
                {{ item.time }}
              </td>
            </tr>
            <tr v-for="item in pad" :key="item">
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="list loading" :style="listStyle" v-else>
        <spinner
          :animation-duration="2000"
          :size="65"
          color="#BBFF33"
        />
      </div>
      <div class="pagination">
        <router-link :to="previousPage" v-if="previousPage">
          <div class="btn prev">
            <img src="../assets/go-left.png" alt="&gt;">
            <span>上一页</span>
          </div>
        </router-link>
        <!-- <div class="btn prev disabled" v-else>
          <img src="../assets/go-left.png" alt="&gt;">
          <span>上一页</span>
        </div> -->
        <div class="placeholder"></div>
        <router-link :to="nextPage" v-if="nextPage">
          <div class="btn next">
            <span>下一页</span>
            <img src="../assets/go-right.png" alt="&lt;">
          </div>
        </router-link>
        <!-- <div class="btn next disabled" v-else>
          <span>下一页</span>
          <img src="../assets/go-right.png" alt="&lt;">
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
import numeral from 'numeral';
import { BreedingRhombusSpinner } from 'epic-spinners';
import { getLotteryList, parseNas } from '../api/index';
import { teams, teamKeys } from '../worldcup';
import { message } from '../utils';

const pageSize = 10;

export default {
  components: { Spinner: BreedingRhombusSpinner },
  created() {
    this.load();
  },
  watch: {
    $route(to) {
      if (to.name === 'PagedDataList') {
        this.load();
      }
    },
  },
  methods: {
    load() {
      this.list = null;
      getLotteryList(this.page, pageSize).then(({ lotteries, count }) => {
        this.count = count;
        this.list = lotteries.map(item => ({
          address: item.address,
          team: teams[teamKeys[item.countryIndex]],
          valueText: `${numeral(parseNas(item.value)).format('0.00')} NAS`,
          expectedBonusText: `${numeral(parseNas(item.expectedBonus)).format('0.00')} NAS`,
          time: moment(item.timestamp).format('YYYY-MM-DD'),
        }));
      }).catch((err) => {
        message.error(`加载数据列表失败 (${err.message})`);
      });
    },
  },
  data() {
    return {
      list: null,
      count: 0,
    };
  },
  computed: {
    listStyle() {
      const height = (48 * (pageSize + 1)) + 2;
      return `min-height: ${height}px;`;
    },
    pad() {
      const length = this.list ? this.list.length : 0;
      if (length >= pageSize) {
        return [];
      }
      return Array(pageSize - length).map((_, i) => length + i);
    },
    page() {
      return Number(this.$route.params.page) || 1;
    },
    previousPage() {
      if (!this.list) { return null; }
      if (this.page <= 1) { return null; }
      const page = `${this.page - 1}`;
      return { name: 'PagedDataList', params: { page } };
    },
    nextPage() {
      if (!this.list) { return null; }
      const maxPage = Math.ceil(this.count / pageSize);
      // const maxPage = Math.ceil(this.count / pageSize);
      if (this.page >= maxPage) { return null; }
      const page = `${this.page + 1}`;
      return { name: 'PagedDataList', params: { page } };
    },
  },

};
</script>
<style lang="less" scoped>
#data-list {
  padding: 57px 0 64px;
  background-color: #14396F;
  color: #ffffff;

  .list.loading {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .description {
    margin-bottom: 39px;

    p {
      font-size: 20px;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    text-align: center;
    border-spacing: 0;
    color: #E6D3A6;
  }
  table, th, td {
    border: 1px solid #E6D3A6;
  }
  th, td {
    padding: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: default;
  }
  th {
    background-color: #E6D3A6;
    color: #000000;
  }

  .pagination {
    display: flex;
    padding: 64px 0 0;
    justify-content: space-between;
    
    .placeholder {
      width: 1px;
      height: 64px;
    }

    .btn {
      width: 140px;
      height: 64px;
      background-color: #E6D3A6;
      color: #000000;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;

      &.disabled {
        background-color: #CCCCCC;
        cursor: not-allowed;
      }

      img, span {
        margin: 8px;
      }

      img {
        width: 16px;
        height: 31px;
      }
    }
  }
}

a {
  color: #000000;
  text-decoration: none;
}
</style>
