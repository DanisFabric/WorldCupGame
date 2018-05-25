<template>
  <div id="footer">
    <div class="container">
      <div id="footer-logo" class="nav-item"><img src="../assets/footer-logo.png" alt=""></div>
      <div class="footer-link-list">
        <a class="footer-link-item" href="https://github.com/DanisFabric/WorldCupGame">网站源码</a>
        <a class="footer-link-item" href="https://github.com/DanisFabric/WorldCupGame/blob/master/contract/worldcup.ts">合约源码</a>
        <a class="footer-link-item" href="mailto:danisfabric@gmail.com">联系我们</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {

};
</script>
<style lang="less" scoped>
#footer {
  background-color: #000000;
  padding: 44px 0;

  #footer-logo {
    padding-bottom: 38px;
    img {
      display: block;
      margin: 0 auto;
      width: 52px;
      height: 84px;
    }
  }

  .footer-link-list {
    display: flex;
    justify-content: center;
    font-size: 20px;

    .footer-link-item {
      min-width: 200px;
      padding: 0 40px;
      text-align: center;
    }
  }
  
  a {
    text-decoration: none;
    color: #ffffff;
  }
}
</style>

