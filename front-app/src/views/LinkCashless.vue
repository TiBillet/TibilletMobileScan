<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Link cashless</h1>
    </v-responsive>
  </v-container>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {tradConfig, trad} from '@/plugins/translation.js'
import {useLocalStore} from '@/store'

const {getLanguage} = useLocalStore()
const router = useRouter()
tradConfig({language: getLanguage})

</script>

<style scoped>

</style>
