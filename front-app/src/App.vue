<template>
  <!--
  <Loading v-if="loading.activation" :icon="loading.icon" :color="loading.color" :text="loading.text"/>

  <v-dialog v-model="messageModal.activation" transition="dialog-top-transition">
    <v-card>
      <v-toolbar :color="messageModal.color" :title="messageModal.title"></v-toolbar>
      <v-card-text v-html="messageModal.message">
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="messageModal.activation = false; messageModal.message = ''">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  -->
   <v-app>
    <router-view/>
  </v-app>
</template>

<script setup>
// composants
// import Loading from '@/components/Loading.vue'

/*
import {ref} from "vue"
import {io} from 'socket.io-client'
import {tradConfig, trad} from '@/communs/translation.js'

const {loading, dialog, allDevicesOn} = storeToRefs(useLocalStore())
const serverSocketIo = import.meta.env.VITE_API_URL_BASE
const socket = io(serverSocketIo)
const {setLoadingConf, setDeviceNfc, getLanguage,} = useLocalStore()

// ref
let messageModal = ref({
  activation: false,
  color: 'orange',
  title: '',
  message: ''
})

tradConfig({language: getLanguage})

// affichage icon de chargemement spécifique à la détermination du type de périphérique
setLoadingConf({
  activation: true,
  color: 'yellow',
  icon: 'mdi-devices'
})


function checkInternet() {
  //const networkState = navigator.connection.type
  // console.log('networkState =', networkState)

  // offline, active le modal
  document.addEventListener("offline", () => {
    setLoadingConf({
      activation: true,
      color: 'red',
      icon: 'mdi-network-off-outline',
      text: trad('Activate your network.')
    })
  }, false)

  // online, supprime le modal
  document.addEventListener("online", () => {
    setLoadingConf({
      activation: false,
      color: 'prymary',
      icon: ''
    })
  }, false)
}

// détermination du type de périphérique (mobile, simu)
try {
  if (cordova) {
    document.addEventListener('deviceready', () => {
      setLoadingConf({
        activation: false,
        color: 'prymary',
        icon: ''
      })
      setDeviceNfc({
        type: 'mobile',
        uuid: device.uuid
      })
      checkInternet()
    }, false)
  }
} catch (e) {
  setLoadingConf({
    activation: false,
    color: 'prymary',
    icon: ''
  })
  const deviceType = import.meta.env.VITE_DEVICE_NFC === 'simu' ? 'simu' : 'inconnu'
  const uuid = import.meta.env.VITE_DEVICE_NFC === 'simu' ? import.meta.env.VITE_SIMU_UUID_DEVICE : ''
  setDeviceNfc({
    type: deviceType,
    uuid
  })
  checkInternet('deviceType')
}

// écoute venant de "emitEvent"
document.body.addEventListener('modal-message', (data) => {
  console.log('message de modal-message,', data.detail)
  messageModal.value = data.detail
})

// écoute websocket
socket.on("connect", () => {
  console.log('-> connexion socket.io', socket.id)
})

socket.on("disconnect", () => {
  console.log('-> deconnexion socket.io', socket.id)
})
 */
</script>

<style>
#app50 {
  width: 100vw;
  height: 100vh;
}
</style>
