<template>
  <div id="data-list">
    <div class="container">
      <div class="description">
        <p>所有数据存储于Nebulas区块链上，本平台无法擅自篡改竞猜数据。</p>
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
              <td class="address">{{ item.address }}</td>
              <td>{{ item.team.name }}</td>
              <td>{{ item.valueText }}</td>
              <td>{{ item.expectedBonusText }}</td>
              <td>{{ item.time }}</td>
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
        <button v-if="error">重新加载数据</button>
        <spinner v-else
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
  data() {
    return {
      list: null,
      count: 0,
      error: null,
    };
  },
  methods: {
    load() {
      this.list = null;
      this.error = null;
      getLotteryList(this.page, pageSize).then(({ lotteries, count }) => {
        this.count = count;
        this.list = lotteries.map(item => ({
          address: item.address,
          team: teams[teamKeys[item.countryIndex]],
          valueText: `${numeral(parseNas(item.value)).format('0.00000000')} NAS`,
          expectedBonusText: `${numeral(parseNas(item.expectedBonus)).format('0.00000000')} NAS`,
          time: moment(item.timestamp).format('YYYY-MM-DD'),
        }));
      }).catch((err) => {
        this.error = err;
        message.error(`加载数据列表失败 (${err.message})`);
        console.error(err);
      });
    },
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

    button {
      width: 300px;
      height: 50px;
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
  td.address {
    padding: 4px 12px;
    word-wrap: break-word;
    font-size: 12px;
    font-family: Monaco, Menlo, Consolas, 'Courier New', Courier, monospace;
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
