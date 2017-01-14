<template>
  <div>
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import sidebar from './components/sidebar.vue'
export default {
  name: 'App',
  components: {
    'sidebar': sidebar
  }
}
</script>
