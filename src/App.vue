<template>
  <div>
    <Navbar :title="title" :links="links" />

    <main class="container">
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from './components/layout/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      links: [
        {
          name: 'Inicio', url: { name: 'home' }
        },
      ]
    }
  },
  computed: mapGetters(['title']),
}
</script>

<style>
  @import './assets/css/main.css';
</style>
