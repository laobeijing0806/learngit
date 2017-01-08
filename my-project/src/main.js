// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import bookBorrowing from './book-borrowing.vue'
/* eslint-disable no-new */

new Vue({
  el: '#main',
  components: {
    'book-borrowing': bookBorrowing
  }
})
