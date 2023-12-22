<script setup lang="ts">
const emit = defineEmits(['update:inputValue'])
defineProps({
  inputValue: {
    type: String,
    default: ''
  },
  isLabel: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    default: '',
  },
  errorInput: {
    type: Object,
    default: {},
    required: false
  }
})
</script>

<template>
  <div class="box">
    <p>{{ isLabel ? name : ''}}</p>
    <div class="form-group" :class="errorInput[name] && 'input-error'">
      <input
          class="form-input"
          :value="inputValue"
          @input="emit('update:inputValue', $event.target.value)"
      />
    </div>
    <p class="error" v-if="errorInput">{{ errorInput[name] }}</p>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 10px;
}

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