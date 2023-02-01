<template>
  <div id="tibillet-scan-container" class="d-flex flex-column justify-space-between align-center">
    <h2>{{ message }}</h2>
    <svg id="bt-scan" @click="checkPermissionCamera()" xmlns="http://www.w3.org/2000/svg" width="75" height="75"
         color="black"
         fill="currentColor" class="bi bi-qr-code-scan" viewBox="0 0 16 16"
         data-bs-toggle="modal" data-bs-target="#modal-qrcode">
      <path
        d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z"/>
      <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z"/>
      <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z"/>
      <path
        d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z"/>
      <path d="M12 9h2V8h-2v1Z"/>
    </svg>
    <v-card style="width: 300px" id="reader"></v-card>
  </div>
</template>

<script setup>
import {Html5Qrcode} from "html5-qrcode"

const props = defineProps({
  message: String
})

const emits = defineEmits(['someQrCode'])
let html5QrCode, cible

function stopScanQrCode() {
  html5QrCode.stop().then(ignore => {
    // QR Code scanning is stopped.
    console.log("QR Code scanning stopped.")
    document.querySelector('#bt-scan').style.display = 'flex'
  }).catch(err => {
    // Stop failed, handle it.
    console.log("Unable to stop scanning.")
  })
}

function onScanSuccess(qrCodeMessage, decodedResult) {
  console.log('-> fonc onScanSuccess, qrCodeMessage =', qrCodeMessage)
  stopScanQrCode()
  emits('someQrCode', qrCodeMessage)
}

function scanQrCode() {
  document.querySelector('#bt-scan').style.display = 'none'
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
}

function requestPermissionSuccess(status) {
  if (!status.hasPermission) {
    requestPermissionError()
  } else {
    scanQrCode()
  }
}

function checkPermissionCameraMobile() {
  console.log('-> checkPermissionCameraMobilecordova !')
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
  console.log('-> checkPermissionCamera !')
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
