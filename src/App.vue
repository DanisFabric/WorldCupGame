<template>
  <div id="app">
    <navigator />
    <router-view/>
    <page-footer />
  </div>
</template>

<script>
import Navigator from './components/Navigator.vue';
import PageFooter from './components/Footer.vue';

export default {
  name: 'App',
  components: { Navigator, PageFooter },
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
  min-width: 960px;
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #BBFF33;
  color: #ffffff;
}
#app {
  margin: 0 auto;
  width: 100%;
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
