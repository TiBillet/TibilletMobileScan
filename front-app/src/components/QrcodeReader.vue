<template>
  <v-card class="mx-auto mb-3" max-width="400">
    <v-card-text class="d-flex flex-column justify-space-between align-center">
      <v-icon icon="mdi-qrcode-scan" color="primary" size="150" @click="activeDialogQrCode()"></v-icon>
      <h2 class="text-h6">{{ message }}</h2>
    </v-card-text>
  </v-card>
  <!--  <v-dialog v-model="dialogQrCode" v-bind="checkPermissionCamera()" class="mx-auto" max-width="400">-->
  <!--  <v-dialog v-model="dialogQrCode" class="mx-auto" max-width="400">
    <v-card>
      <v-card-title>{{ message }}</v-card-title>
      <v-card-text class="d-flex flex-column align-center justify-center">
        <div style="width: 300px" id="qr-reader"></div>
      </v-card-text>
    </v-card>
  </v-dialog> -->
  <video id="video" width="300" height="200" style="border: 1px solid gray"></video>

</template>

<script setup>
import {watch, onMounted, ref} from 'vue'
// import {Html5Qrcode} from 'html5-qrcode'
import '@/communs/zxing-0.19.2.min.js'


const props = defineProps({
  message: String
})

let dialogQrCode = ref(false)
const emits = defineEmits(['someQrCode'])
let html5QrCode, cible

function activeDialogQrCode() {
  console.log('.. fonction activeDialogQrCode !')
  dialogQrCode.value = true
}


async function getMedia() {
  const constraints = {
    audio: false,
    video: {width: 350, height: 350}
  }
  try {
    return await navigator.mediaDevices.getUserMedia(constraints)

  } catch (err) {
    console.log('getMedia, ', err)
    return null
  }
}


/*
function stopScanQrCode() {
  html5QrCode.stop().then(ignore => {
    // QR Code scanning is stopped.
    console.log("QR Code scanning stopped.")
    dialogQrCode.value = false
  }).catch(err => {
    // Stop failed, handle it.
    console.log("Unable to stop scanning.")
    dialogQrCode.value = false
  })
}

function onScanSuccess(qrCodeMessage, decodedResult) {
  console.log('-> fonc onScanSuccess, qrCodeMessage =', qrCodeMessage)
  stopScanQrCode()
  emits('someQrCode', qrCodeMessage)
}


// wait element #reader is in dom
function testVdialogOpen() {
   console.log('2 -> testVdialogOpen')
  setTimeout(() => {
    const refReader = document.querySelector('#reader')
    if (refReader === null) {
      testVdialogOpen()
    } else {
      try {
        if (cordova) {
          cible = 250
        }
      } catch (e) {
        cible = 150
      }
      console.log('cible =', cible)
      scanQrCode()
    }
  }, 1000)
}

watch(dialogQrCode,
  (value) => {
    console.log('1 -> watch')
    if (value) {
      document.addEventListener('deviceready', testVdialogOpen, false)
    }
  }
)
*/

/*

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`);
}

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult);
}

function scanQrCode() {
  console.log('3 -> scanQrCode')
  try {
    console.log('-> lecteur qrCode lancé !')
    html5QrCode = new Html5Qrcode("qr-reader")
    console.log('html5QrCode instancié.')
    const config = {fps: 10, qrbox: {width: cible, height: cible}};

    // caméra arrière = "environment"
    html5QrCode.start({facingMode: "environment"}, config, onScanSuccess)
  } catch (e) {
    console.log('scanQrCode, ', e)
  }
}

function requestPermissionErrorCamera() {
  const deviceCamera = devices.value.Camera
  deviceCamera.activation = false
  deviceCamera.text = trad('Camera locked in !')
}

function requestPermissionSuccessCamera(status) {
  if (!status.hasPermission) {
    scanQrCode()
  } else {
    console.log('status =', status)
  }
}
*/

function decodeOnce(codeReader, selectedDeviceId) {
      codeReader.decodeFromInputVideoDevice(selectedDeviceId, 'video').then((result) => {
        console.log(result.text)
      }).catch((err) => {
        console.error(err)

      })
    }


function waitTagQrReaderOn(device) {
  /*
  setTimeout(() => {
    const refReader = document.querySelector('#qr-reader')
    if (refReader === null) {
      console.log('-> element reader pas visible !')
      waitTagQrReaderOn()
    } else {
      console.log('-> element reader visible !')
      try {
        if (device === 'mobile') {
          const permissions = cordova.plugins.permissions
          permissions.requestPermission(permissions.CAMERA, requestPermissionSuccessCamera, requestPermissionErrorCamera)
        } else {
          scanQrCode()
        }
      } catch (e) {
        console.log('waitTagQrReaderOn,', e)
      }
    }
  }, 1000)

   */
  let selectedDeviceId;
  const codeReader = new ZXing.BrowserQRCodeReader()
  console.log('ZXing code reader initialized')

  codeReader.getVideoInputDevices().then((videoInputDevices) => {
    // console.log('videoInputDevices =', videoInputDevices)
    let indexCam = 0
    // camera back
    if(device === 'mobile') {
      indexCam = 1
    }
    const selectedDeviceId = videoInputDevices[indexCam].deviceId
    decodeOnce(codeReader, selectedDeviceId)
  })
}


onMounted(() => {
  try {
    if (cordova) {
      cible = 250
      waitTagQrReaderOn('mobile')
    }
  } catch (e) {
    // console.log('scan qr codes,', e)
    cible = 150
    waitTagQrReaderOn('desktop')
  }
})
</script>

<style scoped>
video {
  width: 300px;
  height: 300px;
}
</style>
