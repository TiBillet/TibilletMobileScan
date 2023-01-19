<template>
  <h3>Bienvevue {{ uuidDevice }}</h3>
  <img src="@/assets/logo-288x288.png" alt="logo tibillet 288x288 png">
  <NfcReader message="Scanner votre carte primaire." image-url='./images/nfc.svg' @some-tag-id="recepTagId"/>
</template>

<script setup>
import {ref} from 'vue'
// routes
import {useRouter} from 'vue-router'

import NfcReader from "@/components/NfcReader.vue"

const router = useRouter()
let uuidDevice = ref("")
const env = import.meta.env
console.log('env =', env)

function recepTagId(tagId) {
  console.log('-> fonc recepTagId, tagId =', tagId)
  router.push('/menu')
}

document.addEventListener('deviceready', () => {
  uuidDevice.value = device.uuid
}, false)
</script>


<style scoped>
</style>
