<template>
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
  <v-app :theme="theme">
    <router-view/>
  </v-app>
</template>

<script setup>
// composants
import Loading from '@/components/Loading.vue'

import {ref} from "vue"
import {io} from 'socket.io-client'
import {tradConfig, trad} from '@/communs/translation.js'
import {storeToRefs} from 'pinia'
import {useLocalStore} from '@/store'

const {loading} = storeToRefs(useLocalStore())
const serverSocketIo = import.meta.env.VITE_API_URL_BASE
const socket = io(serverSocketIo)
const store = useLocalStore()

// reset store
store.$reset()

const {getLanguage} = store

// ref
let theme = ref('light')
let messageModal = ref({
  activation: false,
  color: 'primary',
  title: '',
  message: ''
})

tradConfig({language: getLanguage})

// écoute venant de "emitEvent"
document.body.addEventListener('modal-message', (data) => {
  console.log('message de modal-message,', data.detail)
  messageModal.value = data.detail
})

document.body.addEventListener('change-theme-input', (data) => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
})


// écoute websocket
socket.on("connect", () => {
  console.log('-> connexion socket.io', socket.id)
})

socket.on("disconnect", () => {
  console.log('-> deconnexion socket.io', socket.id)
})
</script>

<style></style>
