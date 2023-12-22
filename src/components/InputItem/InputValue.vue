<script setup lang="ts">
interface Props {
  inputValue: string;
  name: string;
  errorInput?: string;
  type?: 'input' | 'textarea';
}
const emit = defineEmits(['update:inputValue']);
defineProps<Props>()
</script>

<template>
  <div class="form-group" :class="errorInput && 'input-error'">
    <input
        v-if="type === 'input' || !type"
        class="form-input"
        :value="inputValue"
        @input="emit('update:inputValue', $event.target.value)" />
    <textarea
        v-if="type === 'textarea'"
        class="form-input"
        :value="inputValue"
        @input="emit('update:inputValue', $event.target.value)"
    ></textarea>
  </div>
</template>

<style scoped lang="less">


.form-group {
  display: flex;
  border: 1px solid #ccc;
  max-width: 300px;
}

.form-input {
  border: none;
  padding: 10px;
  width: 100%;
  resize: none;
  &:focus {
    outline: none;
    border: 1px solid green;
  }
}

.input-error {
  border-color: red;
  & .form-input:focus {
    border-color: red;
  }
}
</style>