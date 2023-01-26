<template>
  <div class="d-flex flex-column justify-space-between align-center">
    <v-img width="200" :src="imageUrl" alt="logo nfc"></v-img>
    <h2 id="nfc-tag-msg" class="font-weight-bold">{{ message }}</h2>
    <h3 id="nfc-tag-msg-erreur"></h3>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from "vue"

const props = defineProps({
  message: String,
  imageUrl: String
})

const emit = defineEmits(['someTagId'])
let nfcAtived = ref(false)


function tradTagId(nfcEvent) {
  const tagId = nfc.bytesToHexString(nfcEvent.tag.id).toUpperCase()
  emit('someTagId', tagId)
}

function readTagId() {
  try {
    // écoute le lecteur nfc
    nfc.addTagDiscoveredListener(tradTagId)
  } catch (error) {
    console.log('readTagId,', error)
    document.querySelector('#nfc-tag-msg-erreur').innerHTML = 'readTagId, ' + error
  }
}

onMounted(() => {
  document.addEventListener('deviceready', () => {
    if (nfc) {
      nfcAtived.value = true
      nfc.enabled(readTagId, (error) => {
        // pas activé
        if (error === 'NFC_DISABLED') {
          nfc.showSettings() // donne la possibilité se l'activé
          document.querySelector('#nfc-tag-msg-erreur').innerHTML = "<h6><div>Une fois Nfc activé !</div><div>Redémarrer l'application.</div></h6>"
        }
        if (error === 'NO_NFC') {
          document.querySelector('#nfc-tag-msg-erreur').innerHTML = "<h6>Pas de lecteur Nfc !</h6>"
        }
      })
    } else {
      document.querySelector('#nfc-tag-msg-erreur').innerHTML = '<h6>Nfc non défini, erreur plugin Nfc !</h6>'
    }
  }, false)
})

onUnmounted(() => {
  if ((typeof nfc) !== 'undefined') {
    nfc.removeNdefListener(tradTagId)
  }
})
</script>

<style scoped>
</style>
