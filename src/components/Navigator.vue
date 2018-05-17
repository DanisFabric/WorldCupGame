<template>
  <div id="nav-layers">
    <div id="nav-placeholder"></div>
    <div id="nav" :class="route">
      <div class="container">
        <div class="nav-list">
          <router-link to="/" id="nav-home" class="nav-item">首页</router-link>
          <router-link to="/data-list" id="nav-data-list" class="nav-item">数据列表</router-link>
          <div id="logo" class="nav-item"><img src="../assets/nav-logo.png" alt=""></div>
          <router-link to="/situation" id="nav-situation" class="nav-item">竞猜概况</router-link>
          <router-link to="/prize" id="nav-prize" class="nav-item">获奖</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import cc from 'change-case';

export default {
  computed: {
    route() {
      return cc.paramCase(`route-${this.$route.name}`);
    },
  },
};
</script>
<style lang="less" scoped>
  #nav-placeholder {
    height: 80px;
  }
  #nav {
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
    background-color: #000000;
    height: 80px;

    .nav-list {
      height: 80px;
      display: flex;
      justify-content: center;

      .nav-item {
        transition: all .2s;
        display: block;
        height: 80px;
        line-height: 80px;
        font-size: 20px;
        padding: 0 40px;
        user-select: none;
      }
      a.nav-item {
        cursor: pointer;
        &:hover {
          background-color: fadeout(#ffffff, 80%);
        }
      }
    }
  }

  #nav.route-home a.nav-item#nav-home,
  #nav.route-data-list a.nav-item#nav-data-list,
  #nav.route-situation a.nav-item#nav-situation,
  #nav.route-prize a.nav-item#nav-prize {
    color: #BBFF33;
  }

  #logo {
    position: relative;
    height: 80px;

    img {
      display: block;
      width: 84px;
      height: 96px;
      margin: 0 auto;
      box-shadow: 0 0 5px black;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
  a {
    text-decoration: none;
    color: #ffffff;
  }
</style>
