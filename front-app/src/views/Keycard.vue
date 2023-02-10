<template>
  <v-main>
    <v-container fluid class="h-100">
      <v-row justify="center" align="center" class="h-100">
      <NfcReader :message="trad('Scan your primary card.')" @some-tag-id="recepTagId"/>
        </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
console.log('-> Keycard.vue')
import {useLocalStore} from '@/store'
import {tradConfig, trad} from '@/communs/translation.js'

// composants
import NfcReader from "@/components/NfcReader.vue"

const env = import.meta.env
const {connection, getLanguage} = useLocalStore()

tradConfig({language: getLanguage})

function recepTagId(tagId) {
  console.log('-> fonc recepTagId, tagId =', tagId)
  connection(tagId, env)
}
</script>
