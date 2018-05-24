<template>
  <div id="app">
    <div class="app-container">
      <navigator />
      <router-view/>
      <page-footer />
    </div>
    <add-lottery-modal></add-lottery-modal>
    <check-lottery-modal></check-lottery-modal>
  </div>
</template>

<script>
import Navigator from './components/Navigator.vue';
import PageFooter from './components/Footer.vue';
import AddLotteryModal from './components/AddLotteryModal.vue';
import CheckLotteryModal from './components/CheckLotteryModal.vue';

export default {
  name: 'App',
  components: {
    Navigator, PageFooter, AddLotteryModal, CheckLotteryModal,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  min-width: 960px;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #BBFF33;
  color: #ffffff;
}
#app, .app-container {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

.app-container{
  overflow-y: scroll;
}

.container {
  margin: 0 auto;
  width: 960px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

</style>
