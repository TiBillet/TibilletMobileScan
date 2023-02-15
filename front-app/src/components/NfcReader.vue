<template>
  <v-card class="mx-auto mb-3" max-width="400">
    <v-card-text class="d-flex flex-column justify-center align-center">
      <v-chip-group v-if="getDeviceNfc.type === 'simu'" v-model="selectionCard.value" selected-class="text-primary"
                    mandatory>
        <v-chip v-for="card in cards" :key="card.name" :value="card.value" style="font-size:0.8rem;font-weight: bold">{{ card.name }}</v-chip>
      </v-chip-group>
      <v-img id="tibillet-logo-nfc" width="150" src="/images/nfc.svg" alt="logo nfc"></v-img>
      <h2 v-if="getDeviceNfc.type === 'mobile'" class="text-h6">{{ message }}</h2>
      <h2 v-if="getDeviceNfc.type === 'simu'" class="d-flex flex-wrap text-h6 text-center">
        Simuler le lecteur NFC, en Cliquant sur l'image si-dessus .
      </h2>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {tradConfig, trad} from '@/communs/translation.js'

console.log('-> NfcReader.vue')
import {onMounted, onUnmounted, ref} from "vue"
import {useLocalStore} from '@/store'

const props = defineProps({
  message: String
})
const {getDeviceNfc, getLanguage} = useLocalStore()
const env = import.meta.env
const selectionCard = ref({name: 'carte_primaire', value: env.VITE_SIMU_TAGID_CM})
const cards = [
  {name: 'carte_primaire', value: env.VITE_SIMU_TAGID_CM},
  {name: 'client1', value: env.VITE_SIMU_TAGID_CLIENT1},
  {name: 'client2', value: env.VITE_SIMU_TAGID_CLIENT2},
  {name: 'inconnue', value: 'INCONNUE'}
]

const emit = defineEmits(['someTagId'])
let nfcAtived = ref(false)

tradConfig({language: getLanguage})

function tradTagId(nfcEvent) {
  const tagId = nfc.bytesToHexString(nfcEvent.tag.id).toUpperCase()
  emit('someTagId', tagId)
}

function readTagId() {
  // console.log('-> fonc readTagId !')
  try {
    // écoute le lecteur nfc
    nfc.addTagDiscoveredListener(tradTagId)
  } catch (error) {
    console.log('readTagId,', error)
  }
}


function simuScanNfc() {
  emit('someTagId', selectionCard.value.value)
}

onMounted(() => {
  const deviceNfc = getDeviceNfc
  // console.log('deviceNfc =', deviceNfc)

  if (deviceNfc.type === 'mobile') {
    document.addEventListener('deviceready', readTagId, false)
  }

  if (deviceNfc.type === 'simu') {
    // ajout style boxShadow et évènement 'click'
    const bt = document.querySelector('#tibillet-logo-nfc')
    bt.style.boxShadow = "2px 2px 4px blue"
    bt.addEventListener('click', simuScanNfc, false)
  }
})

onUnmounted(() => {
  if ((typeof nfc) !== 'undefined') {
    nfc.removeNdefListener(tradTagId)
    nfcAtived.value = false
  }
})
</script>

<style scoped>
#tibillet-logo-nfc {
  cursor: pointer;
}
</style>
