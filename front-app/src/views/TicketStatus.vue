<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <h1>Ticket status</h1>

       <v-btn tile class="menu-btn" @click="router.push('/scan')">
        {{ trad("New scan") }}
      </v-btn>
    </v-responsive>
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
