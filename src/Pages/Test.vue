<script setup lang="ts">
import {ref} from "vue";
import {z} from "zod";

import api from "../../services/api.ts";
import Input from "../components/Input.vue";
import {removeEmptyKeys} from "../util";

const products = ref([]);
const errors = ref({});
const payload = ref({
  name: "",
  description: "",
  title: "",
});


function getProducts() {
  api.get("/post").then(response => {
    products.value = response.data
  });
}

function setError(e) {
  clearError();
  e.errors.forEach(err => {
    const error = {
      [err.path[0]]: err.message,
    }
    errors.value = {...errors.value,...error};
  });
}

function clearError() {
  errors.value = {};
}

function validate(): boolean {
  try {
    const clearObject = removeEmptyKeys(payload.value)
    const schema = z.object({
      name: z.string(),
      title: z.string(),
      description: z.string()
    })
    schema.parse(clearObject)
    clearError();
    return false
  } catch (e) {
    setError(e)
    return true;
  }
}

async function submit() {
  const result = validate();

  if (result) return;

  try {
    const resp = await api.post("/post", payload.value)
    const product = resp.data;
    products.value = [...products.value, product]
  } catch (validationError) {
    console.error("Validation error:", validationError.errors);
  }
}

function onMounted() {
  getProducts();
}

onMounted();
</script>

<template>
  <form @submit.prevent="submit" style="display: flex; flex-direction: column; gap: 10px">
    <Input isLabel name="name" v-model:input-value="payload.name" v-model:error-input="errors"/>
    <Input isLabel name="description" v-model:input-value="payload.description" v-model:error-input="errors"/>
    <Input isLabel name="title" v-model:input-value="payload.title" v-model:error-input="errors"/>
    <button type="submit" style="max-width: 300px">Submit</button>
  </form>
  <div>
    <pre>{{ products }}</pre>
  </div>
</template>

<style scoped>

</style>