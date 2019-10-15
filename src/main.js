import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'


import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

import IndexComponent from './components/IndexComponent.vue';
import PhoneComponent from './components/PhoneComponent.vue';
import SearchComponent from './components/SearchComponent.vue';

const routes = [
  {
      name: 'index',
      path: '/',
      components: {
        default: IndexComponent,
        search: SearchComponent
      }
  },
  {
      name: 'phone',
      path: '/phone/:id',
      component: PhoneComponent
  },
] ;

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');