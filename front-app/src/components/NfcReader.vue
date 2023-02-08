<template>
  <div v-if="getDeviceNfc.type === 'simu'">
    <span>Choix carte -> </span>
    <select id="tibillet-select">
      <option :value="cm">primaire</option>
      <option :value="client1">client 1</option>
      <option :value="client2">client 2</option>
      <option value="INCONNUE">INCONNUE</option>
    </select>
  </div>
  <div id="tibillet-logo-nfc-container" class="d-flex flex-column justify-space-between align-center">
    <v-img id="tibillet-logo-nfc" width="200" :src="imageUrl" alt="logo nfc"></v-img>
    <h2 id="nfc-tag-msg" class="font-weight-bold">{{ message }}</h2>
    <h3 id="nfc-tag-msg-erreur"></h3>
  </div>
</template>

<script setup>
import {tradConfig, trad} from '@/communs/translation.js'

console.log('-> NfcReader.vue')
import {onMounted, onUnmounted, ref} from "vue"
import {useLocalStore} from '@/store'

const props = defineProps({
  message: String,
  imageUrl: String
})
const {getDeviceNfc, setLoadingConf, getLanguage} = useLocalStore()
const env = import.meta.env
const cm = env.VITE_SIMU_TAGID_CM
const client1 = env.VITE_SIMU_TAGID_CLIENT1
const client2 = env.VITE_SIMU_TAGID_CLIENT2

const emit = defineEmits(['someTagId'])
let nfcAtived = ref(false)

tradConfig({language: getLanguage})

function tradTagId(nfcEvent) {
  const tagId = nfc.bytesToHexString(nfcEvent.tag.id).toUpperCase()
  emit('someTagId', tagId)
}

function readTagId() {
  console.log('-> fonc readTagId !')
  try {
    setLoadingConf({
      activation: false,
      color: 'primary',
      icon: '',
      text: ''
    })

    // écoute le lecteur nfc
    nfc.addTagDiscoveredListener(tradTagId)
  } catch (error) {
    console.log('readTagId,', error)
    document.querySelector('#nfc-tag-msg-erreur').innerHTML = 'readTagId, ' + error
  }
}

function launchNfc() {
  console.log('-> fonc launchNfc !')
  if (nfc) {
    nfcAtived.value = true
    nfc.enabled(readTagId, (error) => {
      // pas activé
      if (error === 'NFC_DISABLED') {
        // donne la possibilité se l'activé
        // nfc.showSettings()
        //document.querySelector('#nfc-tag-msg-erreur').innerHTML = "<h6><div>Une fois Nfc activé !</div><div>Redémarrer l'application.</div></h6>"
        setLoadingConf({
          activation: true,
          color: 'yellow',
          icon: 'mdi-nfc',
          text: trad('Enable NFC and restart the application !')
        })
      }
      if (error === 'NO_NFC') {
        //document.querySelector('#nfc-tag-msg-erreur').innerHTML = "<h6>Pas de lecteur Nfc !</h6>"
        setLoadingConf({
          activation: true,
          color: 'red',
          icon: 'mdi-nfc-variant-off',
          text: 'Pas de NFC !'
        })
      }
    })
  } else {
    document.querySelector('#nfc-tag-msg-erreur').innerHTML = '<h6>Nfc non défini, erreur plugin Nfc !</h6>'
  }
}

function simuScanNfc() {
  const simuTagId = document.querySelector('#tibillet-select').value
  emit('someTagId', simuTagId)
}

function requestPermissionError() {
  console.warn('NFC permission is not turned on')
  setLoadingConf({
    activation: true,
    color: 'yello',
    icon: 'mdi-nfc-variant-off',
    text: trad('NFC permission is not turned on !')
  })
}

function requestPermissionSuccess(status) {
  if (!status.hasPermission) {
    requestPermissionError()
  } else {
    launchNfc()
  }
}

function checkPermissionNfc() {
  const permissions = cordova.plugins.permissions
  permissions.checkPermission(permissions.NFC, function (status) {
    console.log('status =', status)
    if (status.hasPermission === true) {
      console.log('-> fonc checkPermissionNfc, Ok pour lancer scan carte nfc !')
      launchNfc()
    } else {
      permissions.requestPermission(permissions.NFC, requestPermissionSuccess, requestPermissionError)
    }
  })
}

onMounted(() => {
  const deviceNfc = getDeviceNfc
  console.log('deviceNfc =', deviceNfc)

  if (deviceNfc.type === 'mobile') {
    // TODO: demander permission utiliser nfc
    document.addEventListener('deviceready', checkPermissionNfc, false)
  }

  if (deviceNfc.type === 'simu') {
    // ajout style boxShadow et évènement 'click'
    const bt = document.querySelector('#tibillet-logo-nfc-container')
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
#tibillet-select, #tibillet-logo-nfc {
  cursor: pointer;
}
</style>
