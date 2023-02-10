<template>
  <v-card max-width="400" >
    <v-card-text class="d-flex flex-column justify-space-between align-center">
      <v-icon icon="mdi-qrcode-scan" color="primary" size="150" @click="activeDialogQrCode()"></v-icon>
      <h2 class="text-h6">{{ message }}</h2>
    </v-card-text>
  </v-card>
  <v-dialog v-model="dialogQrCode" v-bind="checkPermissionCamera()">
    <v-card>
      <v-card-title>{{ message }}</v-card-title>
      <v-card-text class="d-flex flex-column align-center justify-center">
        <div style="width: 300px" id="reader"></div>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script setup>
import {ref} from 'vue'
import {Html5Qrcode} from "html5-qrcode"

const props = defineProps({
  message: String
})

let dialogQrCode = ref(false)
const emits = defineEmits(['someQrCode'])
let html5QrCode, cible


function activeDialogQrCode() {
  dialogQrCode.value = true
}

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

function scanQrCode() {
  console.log('-> lecteur qrCode lancé !')
  html5QrCode = new Html5Qrcode("reader")
  const config = {fps: 10, qrbox: {width: cible, height: cible}};

  // caméra arrière = "environment"
  html5QrCode.start({facingMode: "environment"}, config, onScanSuccess)
}


function checkPermissionCameraDesktop() {
  console.log('-> checkPermissionCameraDesktop !')
  navigator.mediaDevices.getUserMedia({audio: false, video: true}).then(function (stream) {
    scanQrCode()
  }).catch(function (error) {
    console.log('Camera:', error)
  })
}

function requestPermissionError() {
  console.warn('Camera permission is not turned on')
  dialogQrCode.value = false
}

function requestPermissionSuccess(status) {
  if (!status.hasPermission) {
    requestPermissionError()
  } else {
    scanQrCode()
  }
}

function checkPermissionCameraMobile() {
  // console.log('-> checkPermissionCameraMobilecordova !')
  const permissions = cordova.plugins.permissions
  permissions.checkPermission(permissions.CAMERA, function (status) {
    // console.log('status.hasPermission =', status.hasPermission)
    if (status.hasPermission === true) {
      scanQrCode()
    } else {
      permissions.requestPermission(permissions.CAMERA, requestPermissionSuccess, requestPermissionError)
    }
  })
}

function checkPermissionCamera() {
  // console.log('-> checkPermissionCamera !')
  try {
    if (cordova) {
      cible = 250
      checkPermissionCameraMobile()
    }
  } catch (e) {
    cible = 150
    checkPermissionCameraDesktop()
  }
}

</script>

<style scoped>
video {
  width: 300px;
  height: 300px;
}
</style>
