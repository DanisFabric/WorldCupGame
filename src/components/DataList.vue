<template>
  <div id="data-list">
    <div class="container">
      <div class="description">
        <p>您能够在当前页面查询到所有的竞猜信息。并且所有数据存储于区块链，本网站无法改动竞猜数据。</p>
      </div>
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
          <tr>
            <td>igboagroqho</td>
            <td>德国</td>
            <td>200.0</td>
            <td>1600.0</td>
            <td>2018-06-01</td>
          </tr>
          <tr>
            <td>igboagroqho</td>
            <td>德国</td>
            <td>200.0</td>
            <td>1600.0</td>
            <td>2018-06-01</td>
          </tr>
          <tr>
            <td>igboagroqho</td>
            <td>德国</td>
            <td>200.0</td>
            <td>1600.0</td>
            <td>2018-06-01</td>
          </tr>
          <tr>
            <td>igboagroqho</td>
            <td>德国</td>
            <td>200.0</td>
            <td>1600.0</td>
            <td>2018-06-01</td>
          </tr>
          <tr>
            <td>igboagroqho</td>
            <td>德国</td>
            <td>200.0</td>
            <td>1600.0</td>
            <td>2018-06-01</td>
          </tr>
          <tr>
            <td>igboagroqho</td>
            <td>德国</td>
            <td>200.0</td>
            <td>1600.0</td>
            <td>2018-06-01</td>
          </tr>
          <tr>
            <td>igboagroqho</td>
            <td>德国</td>
            <td>200.0</td>
            <td>1600.0</td>
            <td>2018-06-01</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <div class="btn prev">
          <img src="../assets/go-left.png" alt="&gt;">
          <span>上一页</span>
        </div>
        <div class="btn prev">
          <span>下一页</span>
          <img src="../assets/go-right.png" alt="&lt;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="less" scoped>
#data-list {
  padding: 57px 0 64px;
  background-color: #14396F;
  color: #ffffff;

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
  }
  th {
    background-color: #E6D3A6;
    color: #000000;
  }

  .pagination {
    display: flex;
    padding: 64px 0 0;
    justify-content: space-between;
    
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
</style>
