<template>
  <Loading v-if="loading"/>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img contain height="200" src="@/assets/logo-288x288.png"/>
      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>
      <h2 class="text-h2 font-weight-bold">TiBillet Coop</h2>
      <NfcReader message="Scanner votre carte primaire." image-url='./images/nfc.svg' @some-tag-id="recepTagId"/>
    </v-responsive>
  </v-container>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {storeToRefs} from 'pinia'
import {useLocalStore} from '@/store'


// composants
import NfcReader from "@/components/NfcReader.vue"
import Loading from '@/components/Loading.vue'

const router = useRouter()
const env = import.meta.env
// ref
const {loading} = storeToRefs(useLocalStore())
const {connection} = useLocalStore()

let uuidDevice = ''
console.log('env =', env)

function recepTagId(tagId) {
  console.log('-> fonc recepTagId, tagId =', tagId)
  connection(tagId, uuidDevice,env.VITE_API_URL_BASE)
}

document.addEventListener('deviceready', () => {
  uuidDevice = device.uuid
  console.log('uuidDevice =', uuidDevice)
}, false)

</script>
