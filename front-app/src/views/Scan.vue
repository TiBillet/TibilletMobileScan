<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center w-100 h-100">
    <QrcodeReader :message="trad('Qrcode Ticket Scanner.')" @some-qr-code="recepQrCode"/>
    <NfcReader :message="trad('Scanner nfc card.')" image-url='./images/nfc.svg' @some-tag-id="recepTagId"/>
  </v-container>
  <v-footer class="d-flex flex-column">
    <v-btn class="menu-btn" to="menu" color="primary">
      {{ trad("Return") }}
    </v-btn>
  </v-footer>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {tradConfig, trad} from '@/communs/translation.js'
import {useLocalStore} from '@/store'

// composants
import NfcReader from "@/components/NfcReader.vue"
import QrcodeReader from '@/components/QrcodeReader.vue'

const {getLanguage} = useLocalStore()
const router = useRouter()
tradConfig({language: getLanguage})


function recepTagId(tagId) {
  console.log('-> fonc recepTagId de Scan.vue, tagId =', tagId)
}

// qr-code billet
function recepQrCode(qrCode) {
  console.log('-> fonc recepQrCode de Scan.vue, qrCode =', qrCode)
  // 1 - GET /api/billet

  // 2 - afficher etat billet + infos divers
  router.push('/ticketstatus')
}

</script>

<style scoped>

</style>
