<template>
  <v-overlay model-value="true" persistent="true" class="align-center justify-center rep-loading-component">
    <v-progress-circular :color="color" indeterminate size="300" width="8">
      <v-icon :icon="icon" size="64"></v-icon>
      <div>{{ text }}</div>
    </v-progress-circular>
  </v-overlay>

</template>

<script setup>
const props = defineProps({
  color: String,
  icon: String,
  text: String
})
</script>
