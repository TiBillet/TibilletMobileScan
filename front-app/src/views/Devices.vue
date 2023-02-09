<template>
  <v-container class="d-flex flex-column align-center justify-center h-100">
    <v-progress-circular :color="color" indeterminate size="300" width="8">
      <div class="d-flex flex-column align-center">
        <v-icon icon="mdi-state-machine" size="64"></v-icon>
        <div>{{ trad('Check the devices !') }}</div>
      </div>
    </v-progress-circular>
    <!-- devices -->
    <div v-for="(item, index) in devices" :key="index" class="d-flex flex-row">
      <div :style="{backgroundColor: item.activation === true ? 'green' : 'red'}">{{ trad(index) }}</div>
      <div>{{ item.text }}</div>
    </div>

  </v-container>
</template>

<script setup>
import {ref, onMounted} from "vue"
import {tradConfig, trad} from '@/communs/translation.js'
import {useLocalStore} from '@/store'
import {useRouter} from 'vue-router'

const router = useRouter()
const {updateDevices} = useLocalStore()
const env = import.meta.env
const {getLanguage} = useLocalStore()
let color = ref('green')
let devices = ref({
  Network: {
    activation: false,
    text: '?',
    nbTest: 0
  },
  Nfc: {
    activation: false,
    type: 'inconnu',
    text: '?',
    uuid: '?',
    nbTest: 0
  },
  Camera: {
    activation: false,
    text: '?'
  }
})

tradConfig({language: getLanguage})

function testAllDevicesEnabled() {
  const devicesValues = devices.value
  const nbTotalActivationFind = Object.keys(devicesValues).length
  let nbTotalActivationTest = 0
  for (const devicesKey in devicesValues) {
    const obj = devicesValues[devicesKey]
    if (obj.activation === true) {
      nbTotalActivationTest++
    }
  }

  if (nbTotalActivationFind === nbTotalActivationTest) {
    // save state devices
    updateDevices(devices.value)
    console.log("--> lancer l'application !")
    router.push('/keycard')
  }
}

// --- camera ---
function requestPermissionErrorCamera() {
  const deviceCamera = devices.value.Camera
  deviceCamera.activation = false
  deviceCamera.text = trad('Camera locked in !')
}

function checkCameraDesktop() {
  navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(function (stream) {
    const deviceCamera = devices.value.Camera
    deviceCamera.activation = true
    deviceCamera.text = trad('Enabled.')

    testAllDevicesEnabled()
  }).catch(function (error) {
    console.log('Camera:', error)
    requestPermissionErrorCamera()
  })
}

function requestPermissionSuccessCamera(status) {
  if (!status.hasPermission) {
    requestPermissionErrorCamera()
  } else {
    const deviceCamera = devices.value.Camera
    deviceCamera.activation = true
    deviceCamera.text = trad('Enabled.')

    testAllDevicesEnabled()
  }
}

function checkCamera(device) {
  try {
    if (device === 'simu') {
      checkCameraDesktop()
    }
    if (device === 'mobile') {
      const permissions = cordova.plugins.permissions
      permissions.requestPermission(permissions.CAMERA, requestPermissionSuccessCamera, requestPermissionErrorCamera)
    }
  } catch (e) {
    console.log(e)
  }
}

// --- NFC ---
function informedNfcMobileActivation() {
  const deviceNfc = devices.value.Nfc
  deviceNfc.activation = true
  deviceNfc.type = 'mobile'
  deviceNfc.text = trad('Enabled.')
  deviceNfc.uuid = device.uuid

  testAllDevicesEnabled()
}

function informedNfcMobileActivationNone(error) {
  const deviceNfc = devices.value.Nfc
  deviceNfc.activation = false
  deviceNfc.type = 'mobile'
  deviceNfc.text = trad('Enable NFC !')
  deviceNfc.uuid = device.uuid

  // attente activation nfc
  deviceNfc.nbTest = deviceNfc.nbTest + 1

  // TODO: insérer un bouton pour afficher la vue d'activation du nfc
  // if (deviceNfc.nbTest === 1) { nfc.showSettings() }

  if (deviceNfc.nbTest < 250) {
    setTimeout(() => {
      nfc.enabled(informedNfcMobileActivation, informedNfcMobileActivationNone)
    }, 1000, device)
  } else {
    deviceNfc.text = trad('NFC activation time exceeded, restart application !')
  }
}

function checkNfc(device) {
  // nfc mobile
  if (device === 'mobile') {
    console.log('device =', device)
    nfc.enabled(informedNfcMobileActivation, informedNfcMobileActivationNone)
  }

  // simu nfc on desktop
  if (device === 'simu') {
    const deviceNfc = devices.value.Nfc
    deviceNfc.activation = true
    deviceNfc.type = 'simu'
    deviceNfc.text = trad('Enabled.')
    deviceNfc.uuid = env.VITE_SIMU_UUID_DEVICE

    testAllDevicesEnabled()
  }
}


// --- network ---
function offline(device) {
  const deviceNetwork = devices.value.Network
  deviceNetwork.activation = false
  deviceNetwork.text = trad('Activate your network.')
  // attente activation network
  deviceNetwork.nbTest = deviceNetwork.nbTest + 1
  if (deviceNetwork.nbTest < 250) {
    setTimeout(() => {
      testOnline(device)
    }, 1000, device)
  } else {
    deviceNetwork.text = trad('Network activation time exceeded, restart the application !')
  }
}

function online(device) {
  const deviceNetwork = devices.value.Network
  deviceNetwork.activation = true
  deviceNetwork.text = trad('The network is activated !')

  testAllDevicesEnabled()
}

function testOnline(device) {
  let statusNetwork
  if (device === 'mobile') {
    statusNetwork = navigator.connection.type
  } else { // desktop
    statusNetwork = navigator.onLine
  }

  if (statusNetwork === 'none' || statusNetwork === false) {
    offline(device)
  } else {
    online(device)
  }
}

// launch tests
function Tests(device) {
  testOnline(device)
  checkNfc(device)
  checkCamera(device)
}

// enter point
onMounted(() => {
  try {
    if (cordova) { // cordova / mobile
      document.addEventListener('deviceready', () => {
        Tests('mobile')
      })
    }
  } catch (e) {  // desktop / simu
    Tests('simu')
  }
})
</script>

<style scoped></style>
