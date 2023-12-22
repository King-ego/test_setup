<script setup lang="ts">
defineProps({

  name: {
    type: String,
    default: "",
    required: true
  },
})
</script>

<template>
  <p>{{ name ? name : '' }}</p>
</template>

<style scoped>

</style>