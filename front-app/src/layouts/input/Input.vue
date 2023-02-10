<template>
  <v-app>
    <input-bar @change-theme-input="changeThemeInput()"/>

    <input-view/>
  </v-app>
</template>

<script setup>
// composants
import InputBar from './AppBar.vue'
import InputView from './View.vue'
</script>
