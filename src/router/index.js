import Vue from 'vue/dist/vue.common';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import DataList from '../components/DataList.vue';
import Situation from '../components/Situation.vue';
import Prize from '../components/Prize.vue';
// import RepoList from '@/components/RepoList';
// import EditConfig from '@/components/EditConfig';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/data-list',
      name: 'DataList',
      component: DataList,
    },
    {
      path: '/situation',
      name: 'Situation',
      component: Situation,
    },
    {
      path: '/prize',
      name: 'Prize',
      component: Prize,
    },
  ],
});

