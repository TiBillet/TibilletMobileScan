<template>
  <v-container class="d-flex flex-column align-center justify-center h-100">
    <v-progress-circular :color="color" indeterminate size="300" width="8">
      <div class="d-flex flex-column align-center">
        <v-icon icon="mdi-state-machine" size="64"></v-icon>
        <div>{{ trad('Check the devices !') }}</div>
      </div>
    </v-progress-circular>
    <!-- network -->
    <div class="d-flex flex-row">
      <div :style="{backgroundColor: deviceNetwork.activation === true ? 'green' : 'red'}">{{ trad('Network') }}</div>
      <div>{{ deviceNetwork.text }}</div>
    </div>

    <!-- nfc -->
    <div class="d-flex flex-row">
      <div :style="{backgroundColor: deviceNfc.activation === true ? 'green' : 'red'}">Nfc</div>
      <div>{{ deviceNfc.text }}</div>
    </div>

    <!-- camera -->
    <div class="d-flex flex-row">
      <div :style="{backgroundColor: deviceCamera.activation === true ? 'green' : 'red'}">{{ trad('Camera') }}</div>
      <div>{{ deviceCamera.text }}</div>
    </div>

  </v-container>
</template>

<script setup>
import {ref, onMounted} from "vue"
import {tradConfig, trad} from '@/communs/translation.js'
import {useLocalStore} from '@/store'

const env = import.meta.env
const {getLanguage} = useLocalStore()


let deviceNetwork = ref({
  activation: false,
  text: '?',
  nbTest: 0
})
let deviceNfc = ref({
  activation: false,
  type: 'inconnu',
  text: '?',
  uuid: '?',
  nbTest: 0
})
let deviceCamera = ref({
  activation: false,
  text: '?'
})
let color = ref('green')

tradConfig({language: getLanguage})

function launchApp() {
  console.log('réseau =', deviceNetwork.value.activation)
  console.log('nfc =', deviceNfc.value.activation)
  console.log('caméra =', deviceCamera.value.activation)
}

// etape 3, check camera
function requestPermissionErrorCamera() {
  deviceCamera.value.activation = false
  deviceCamera.value.text = trad('Camera locked in !')
}

function checkCameraDesktop() {
  console.log('-> checkPermissionCameraDesktop !')
  navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(function (stream) {
    deviceCamera.value.activation = true
    deviceCamera.value.text = trad('Enabled.')
    launchApp()
  }).catch(function (error) {
    console.log('Camera:', error)
    requestPermissionErrorCamera()
  })
}


function requestPermissionSuccessCamera(status) {
  if (!status.hasPermission) {
    requestPermissionErrorCamera()
  } else {
     deviceCamera.value.activation = true
    deviceCamera.value.text = trad('Enabled.')
    launchApp()
  }
}

function checkCamera(device) {
  console.log('-> fonc checkCamera,', device)
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

// etape 2, check NFC
function informedNfcMobileActivation() {
  deviceNfc.value.activation = true
  deviceNfc.value.type = 'mobile'
  deviceNfc.value.text = trad('Enabled.')
  deviceNfc.value.uuid = device.uuid
  checkCamera('mobile')
}

function informedNfcMobileActivationNone(error) {
  deviceNfc.value.activation = false
  deviceNfc.value.type = 'mobile'
  deviceNfc.value.text = trad('Enable NFC !')
  deviceNfc.value.uuid = device.uuid
  console.log('deviceNfc =', deviceNfc.value)
  // attente activation nfc
  deviceNfc.value.nbTest = deviceNfc.value.nbTest + 1
  if (deviceNfc.value.nbTest < 250) {
    setTimeout(() => {
      nfc.enabled(informedNfcMobileActivation, informedNfcMobileActivationNone)
    }, 1000, device)
  } else {
    deviceNfc.value.text = trad('NFC activation time exceeded, restart application !')
  }
}

function checkNfc(device) {
  console.log('-> fonc checkNfc !')
  // nfc mobile
  if (device === 'mobile') {
    console.log('device =', device)
    nfc.enabled(informedNfcMobileActivation, informedNfcMobileActivationNone)
  }

  // simu nfc on desktop
  if (device === 'simu') {
    console.log('device =', device)
    deviceNfc.value.activation = true
    deviceNfc.value.type = 'simu'
    deviceNfc.value.text = trad('Enabled.')
    deviceNfc.value.uuid = env.VITE_SIMU_UUID_DEVICE
    checkCamera(device)
  }
}


// etape 1, network
function testOnlineMobile() {
  const statusNetwork = navigator.connection.type
  console.log('-> deviceready, statusNetwork =', statusNetwork, '  --  type =', typeof (statusNetwork))
  if (statusNetwork === 'none') {
    offline('mobile')
  } else {
    online('mobile')
  }
}

function testOnlineSimu() {
  if (navigator.onLine === false) {
    offline('simu')
  } else {
    online('simu')
  }
}

function offline(device) {
  console.log('-> offline, device =', device)
  deviceNetwork.value.activation = false
  deviceNetwork.value.text = trad('Activate your network.')
  console.log('deviceNetwork =', deviceNetwork.value)
  // attente activation network
  deviceNetwork.value.nbTest = deviceNetwork.value.nbTest + 1
  if (deviceNetwork.value.nbTest < 250) {
    setTimeout(() => {
      if (device === 'mobile') {
        testOnlineMobile()
      }
      if (device === 'simu') {
        testOnlineSimu()
      }
    }, 1000, device)
  } else {
    deviceNetwork.value.text = trad('Network activation time exceeded, restart the application !')
  }
}

function online(device) {
  console.log('-> online, device =', device)
  deviceNetwork.value.activation = true
  deviceNetwork.value.text = trad('The network is activated !')
  checkNfc(device)
}

onMounted(() => {
  // etape 1, check network
  try {
    if (cordova) { // cordova / mobile
      document.addEventListener('deviceready', () => {
        testOnlineMobile()
      })
    }
  } catch (e) {  // desktop / simu
    testOnlineSimu()
  }
})

</script>

<style scoped>

</style>
