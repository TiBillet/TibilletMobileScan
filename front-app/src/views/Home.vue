<template>
  <Loading v-if="loading"/>

  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img contain height="200" src="@/assets/logo-288x288.png"/>
      <div class="text-body-2 font-weight-light mb-n1">{{ trad('Welcome to')}}</div>
      <h2 class="text-h2 font-weight-bold">TiBillet Coop</h2>
      <NfcReader :message="trad('Scan your primary card.')" image-url='./images/nfc.svg' @some-tag-id="recepTagId"/>
    </v-responsive>
  </v-container>


  <v-dialog v-model="dialog.activation" transition="dialog-top-transition">
    <v-card>
      <v-toolbar :color="dialog.color" :title="dialog.title"></v-toolbar>
      <v-card-text v-html="dialog.message">
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="dialog.activation = false; dialog.message = ''">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {useLocalStore} from '@/store'
import { tradConfig, trad } from '@/plugins/translation.js'

// composants
import NfcReader from "@/components/NfcReader.vue"
import Loading from '@/components/Loading.vue'

const router = useRouter()
const env = import.meta.env
// ref
const {loading, dialog} = storeToRefs(useLocalStore())
const {connection, dialogActivationFalse, getLanguage} = useLocalStore()

let uuidDevice = ''
dialogActivationFalse()

tradConfig({language: getLanguage})

function recepTagId(tagId) {
  // console.log('-> fonc recepTagId, tagId =', tagId)
  connection(tagId, uuidDevice, env)
}

document.addEventListener('deviceready', () => {
  uuidDevice = device.uuid
  // console.log('uuidDevice =', uuidDevice)
}, false)

// réception message "simu-some-tag-id"
document.body.addEventListener('simu-some-tag-id', (data) => {
  uuidDevice = device.uuid
  // console.log('-> reception msg "simu-some-tag-id", data =', data.detail)
  connection(data.detail, uuidDevice, env)
})

</script>
