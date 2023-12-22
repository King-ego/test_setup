<script setup lang="ts">
defineProps({
  errorInput: {
    type: String,
    default: "",
    required: false
  }
})
</script>

<template>
  <p class="error" v-if="errorInput">{{ errorInput }}</p>
</template>

<style scoped>
.error {
  color: red;
  font-size: 10px;
}
</style>