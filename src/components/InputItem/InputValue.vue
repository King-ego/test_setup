<script setup lang="ts">
interface EventChange {
  target: HTMLInputElement
}
interface Props {
  inputValue: string;
  name: string;
  errorInput?: string;
  type?: 'input' | 'textarea';
}
defineProps<Props>()

const emit = defineEmits(['update:inputValue']);

function changeValueInput(event: EventChange) {
  emit('update:inputValue', event.target.value)
}
</script>

<template>
  <div class="form-group" :class="errorInput && 'input-error'">
    <input
        v-if="type === 'input' || !type"
        class="form-input"
        :value="inputValue"
        @input="changeValueInput" />
    <textarea
        v-if="type === 'textarea'"
        class="form-input"
        :value="inputValue"
        @input="changeValueInput"
    ></textarea>
  </div>
</template>

<style scoped lang="less">


.form-group {
  display: flex;
  border: 1px solid #ccc;
  max-width: 300px;
}

textarea {
  min-height: 200px;
  resize: none;
}

.form-input {
  border: none;
  padding: 10px;
  width: 100%;
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