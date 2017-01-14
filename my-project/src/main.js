// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
/* eslint-disable no-new */

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/home', component: require('./components/home.vue') },
    { path: '/book', component: require('./components/book-borrowing.vue') }
  ]
})

new Vue({
  el: '#main',
  components: {
    App
  },
  router: router
})
