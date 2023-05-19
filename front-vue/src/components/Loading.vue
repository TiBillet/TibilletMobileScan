<template>
  <div class="fixed-top bg-dark transparent-modal vw-100 vh-100">
    <div class="d-flex justify-content-center align-items-center vw-100 vh-100">
      <div class="spinner-border text-info" role="status" :style="styleObject"></div>
    </div>
  </div>

</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  size: String,
  borderSize: String,
  borderColor: String
})


let styleObject = ref({
  width: props.size,
  height: props.size,
  borderWidth: props.borderSize,
  borderColor: props.borderColor
})
</script>

<style scoped>
.transparent-modal {
  opacity: 0.4;
  z-index: 99;
}
</style>