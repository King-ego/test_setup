<script setup lang="ts">
  const emit = defineEmits(['update:inputValue'])
  const props = defineProps({
    inputValue: {
      type: String,
      default: ''
    },
    errorInput: {
      type: String,
      default: '',
      required: false
    }
  })
</script>

<template>
  <div class="form-group">
    <input class="form-input" type="text" placeholder="" :value="inputValue" @input="emit('update:inputValue', $event.target.value)" />
  </div>
</template>

<style scoped>
.form-input {
  border: none;
  width: 100%;
}
.form-group {
  max-width: 300px;
  border: 1px solid #000;
  padding: 5px;
}
</style>