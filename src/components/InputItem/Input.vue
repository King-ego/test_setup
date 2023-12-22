<script setup lang="ts">
  const emit = defineEmits(['update:inputValue']);
  defineProps({
    inputValue: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: '',
    },
    errorInput: {
      type: String,
      default: "",
      required: false
    }
  })
</script>

<template>
  <div class="form-group" :class="errorInput && 'input-error'">
    <input
        class="form-input"
        :value="inputValue"
        @input="emit('update:inputValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>


.form-group {
  display: flex;
  border: 1px solid #ccc;
  max-width: 300px;
}

.form-input {
  border: none;
  padding: 10px;
  width: 100%;
}

.input-error {
  border: 1px solid red !important;
}
</style>