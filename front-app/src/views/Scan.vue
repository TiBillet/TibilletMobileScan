<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <QrcodeReader :message="trad('Qrcode Ticket Scanner.')" @some-qr-code="recepQrCode"/>
      <NfcReader :message="trad('Scanner nfc card.')" image-url='./images/nfc.svg' @some-tag-id="recepTagId"/>

      <v-btn tile class="menu-btn" @click="router.push('/menu')">
        {{ trad("Return") }}
      </v-btn>
    </v-responsive>
  </v-container>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {tradConfig, trad} from '@/plugins/translation.js'
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
