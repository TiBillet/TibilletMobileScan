<template>
  <v-app-bar flat color="primary" class="vh-5">
    <template v-slot:prepend>
      <v-img :width="38" src="/favicon.png"></v-img>
    </template>
    <v-app-bar-title>
      Lieu
    </v-app-bar-title>
    <template v-slot:append>
      <v-btn :prepend-icon="getTheme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="emitEvent('change-theme-input',{})" class="d-flex flex-row">
        {{ trad('Theme')}}
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import {useLocalStore} from '@/store'
import {tradConfig, trad} from '@/communs/translation.js'
import {emitEvent} from '@/communs/EmitEvent.js'

const {getLanguage, getTheme} = useLocalStore()
tradConfig({language: getLanguage})

</script>
