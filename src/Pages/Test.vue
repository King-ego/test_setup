<script setup lang="ts">
import {ref} from "vue";
import * as zod from "zod";

import api from "../../services/api.ts";
import {removeEmptyKeys} from "../util";

import Box from "../components/InputItem/Box.vue";
import Label from "../components/InputItem/Label.vue";
import Input from "../components/InputItem/Input.vue";
import Error from "../components/InputItem/Error.vue";

const initialPayload = {
  name: "",
  description: "",
  title: "",
};

const products = ref([]);
const errors = ref({});
const payload = ref({...initialPayload});
const isTrySubmit = ref(false);


function setProducts() {
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
    errors.value = {...errors.value, ...error};
  });
}

function clearError() {
  errors.value = {};
}

function validate(): boolean | void {
  if (!isTrySubmit.value) return;

  try {
    const clearObject = removeEmptyKeys(payload.value)
    const schema = zod.object({
      name: zod.string(),
      title: zod.string(),
      description: zod.string()
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
  isTrySubmit.value = true;

  const result = validate();

  if (result) return;

  try {
    const resp = await api.post("/post", payload.value)
    const product = resp.data;
    products.value = [...products.value, product]
    payload.value = {...initialPayload};
  } catch (validationError) {
    console.error("Validation error:", validationError.errors);
  }
}

function onMounted() {
  setProducts();
}

onMounted();
</script>

<template>
  <form @submit.prevent="submit" style="display: flex; flex-direction: column; gap: 10px">
    <Box>
      <Label name="name"/>
      <Input @input="validate()" name="name" v-model:input-value="payload.name" :error-input="errors['name']"/>
      <Error :error-input="errors['name']"/>
    </Box>

    <Box>
      <Label name="description"/>
      <Input @input="validate()" name="description" v-model:input-value="payload.description"
             :error-input="errors['description']"/>
      <Error :error-input="errors['description']"/>
    </Box>

    <Box>
      <Label name="title"/>
      <Input @input="validate()" name="title" v-model:input-value="payload.title"
             :error-input="errors['title']"/>
      <Error :error-input="errors['title']"/>

    </Box>

    <button type="submit" style="max-width: 300px">Submit</button>

  </form>
  <div>
    <pre>{{ products }}</pre>
  </div>
</template>

<style scoped>

</style>