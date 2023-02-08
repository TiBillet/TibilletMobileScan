<template>
  <v-container class="d-flex flex-column align-center justify-center h-100">

    <v-btn class="mt-4 mb-4" color="primary" width="46vh" height="10vh" text-transform="uppercase">
      <div class="text-wrap text-center text-h5">{{ trad("Create a new member.") }}</div>
    </v-btn>

    <v-btn class="mt-4 mb-4" to="scan" color="primary" width="46vh" height="10vh" text-transform="uppercase">
      <div class="text-wrap text-center text-h5">{{ trad("Scan a booking or membership.") }}</div>
    </v-btn>

    <v-btn class="mt-4 mb-4" color="primary" width="46vh" height="10vh" text-transform="uppercase">
      <div class="text-wrap text-center text-h5">{{ trad("Sales points") }}</div>
    </v-btn>

    <v-btn class="mt-4 mb-4" color="primary" width="46vh" height="10vh" text-transform="uppercase">
      <div class="text-wrap text-center text-h5">{{ trad("Reload cashless card.") }}</div>
    </v-btn>

    </v-container>
</template>

<script setup>
// import {useRouter} from 'vue-router'

import {tradConfig, trad} from '@/communs/translation.js'
import {useLocalStore} from '@/store'

// const router = useRouter()
const {getLanguage} = useLocalStore()

tradConfig({language: getLanguage})
</script>

<style scoped>
</style>
