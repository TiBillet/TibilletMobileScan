<template>
    <v-container fluid class="d-flex flex-column align-center justify-center" style="height: 95vh;">
      <NfcReader :message="trad('Scan your primary card.')" @some-tag-id="recepTagId"/>
    </v-container>
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
