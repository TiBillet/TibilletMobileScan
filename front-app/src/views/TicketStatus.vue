<template>
  <v-container fluid class="d-flex flex-column align-center justify-center" style="height: 95vh;">
      <h1>Ticket status</h1>

       <v-btn tile class="menu-btn" to="scan">
        {{ trad("New scan") }}
      </v-btn>
  </v-container>

</template>

<script setup>
import {useRouter} from 'vue-router'
import {tradConfig, trad} from '@/communs/translation.js'
import {useLocalStore} from '@/store'

const {getLanguage} = useLocalStore()
const router = useRouter()
tradConfig({language: getLanguage})

</script>

<style scoped>

</style>
