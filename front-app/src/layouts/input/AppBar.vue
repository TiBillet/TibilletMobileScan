<template>
  <v-app-bar color="background.darken1" density="compact">
    <template v-slot:prepend>
      <v-img :width="38" src="/favicon.png"></v-img>
    </template>
    <template v-slot:append>
      <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
             @click=" emitEvent('change-theme-input',{})">
        {{ trad('Theme')}}
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup>
import {useLocalStore} from '@/store'
import {tradConfig, trad} from '@/communs/translation.js'
import {emitEvent} from '@/communs/EmitEvent.js'

// const emit = defineEmits(['changrThemeInput'])
const {getLanguage} = useLocalStore()
tradConfig({language: getLanguage})

</script>
