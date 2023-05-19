<template>
  <Loading v-if="loading"/>
  <Navbar/>
  <router-view></router-view>
</template>

<script setup>
import * as bootstrap from '../node_modules/bootstrap/dist/js/bootstrap.esm.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '@/components/Navbar.vue'
import Loading from '@/components/Loading.vue'

</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
