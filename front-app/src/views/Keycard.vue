<template>

  <v-container class="d-flex flex-column align-center justify-center h-100">
    <div class="logo-container-s2">
      <v-img class="p-0 m-0" width="12rem" contain src="@/assets/logo-288x288.png"/>
    </div>
    <div class="text-body-2 font-weight-light mb-n1">{{ trad('Welcome to') }}</div>
    <h2 class="text-h3 font-weight-bold text-wrap text-center">TiBillet Coop</h2>
  </v-container>
  <v-footer class="d-flex flex-column align-center justify-center">
    <NfcReader v-if="deviceNfc.type !== 'inconnu'" :message="trad('Scan your primary card.')"
               image-url='./images/nfc.svg' @some-tag-id="recepTagId"/>
  </v-footer>
</template>

<script setup>
// console.log('-> Keycard.vue')
import {storeToRefs} from 'pinia'
import {useLocalStore} from '@/store'
import {tradConfig, trad} from '@/communs/translation.js'

// composants
import NfcReader from "@/components/NfcReader.vue"

const env = import.meta.env

// ref
const {loading, deviceNfc} = storeToRefs(useLocalStore())

const {connection, getLanguage} = useLocalStore()

function recepTagId(tagId) {
  const uuidDevice = deviceNfc.value.uuid
  console.log('-> fonc recepTagId, tagId =', tagId, '  --  uuidDevice =', uuidDevice)
  connection(tagId, uuidDevice, env)
}

tradConfig({language: getLanguage})
</script>

<style>
.logo-container-s2 {
  height: 12rem;
  width: 12rem;
  margin: 0;
  overflow: hidden;
}
</style>
