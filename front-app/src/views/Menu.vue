<template>
  <div class="v-main d-flex flex-column justify-space-between align-center">
    <v-btn tile class="menu-btn">
      {{ trad("Create a new member.")}}
    </v-btn>

    <v-btn tile class="menu-btn" @click="router.push('/scan')">
      {{ trad("Scan a booking or membership.")}}
    </v-btn>

    <v-btn tile class="menu-btn">
      {{ trad("Sales points")}}
    </v-btn>

    <v-btn tile class="menu-btn">
      {{ trad("Reload cashless card.")}}
    </v-btn>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'

import { tradConfig, trad } from '@/plugins/translation.js'
import {useLocalStore} from '@/store'

const router = useRouter()
const {getLanguage} = useLocalStore()

tradConfig({language: getLanguage})
</script>

<style scoped>
.v-main {
  width: 100%;
  height: 100%;
}
.menu-btn {
  width: 300px;
  font-size: 1.5rem;
}
</style>
