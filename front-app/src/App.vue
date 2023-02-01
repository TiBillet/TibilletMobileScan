<template>
  <router-view/>
</template>

<script setup>
import { io } from 'socket.io-client'
const serverSocketIo = import.meta.env.VITE_API_URL_BASE
const socket = io(serverSocketIo)

socket.on("connect", () => {
  console.log('-> connexion socket.io', socket.id)
})

socket.on("disconnect", () => {
  console.log('-> deconnexion socket.io',socket.id)
})
</script>
