<script setup lang="ts">

interface ParseError {
  errors: { path: string[]; message: string }[]
}

import {ref} from "vue";
import * as zod from "zod";

import api from "../../services/api.ts";
import {removeEmptyKeys} from "../util";

import Box from "../components/InputItem/Box.vue";
import Label from "../components/InputItem/Label.vue";
import Input from "../components/InputItem/InputValue.vue";
import Error from "../components/InputItem/Error.vue";

const initialPayload = {
  author: "",
  description: "",
  title: "",
};

const products = ref([]);
const errors = ref({});
const payload = ref({...initialPayload});
const isTrySubmit = ref(false);


function setProducts(): void {
  api.get("/post").then(response => {
    products.value = response.data
  });
}

function setErrors(e: ParseError): void {
  clearError();

  e.errors.forEach(err => {
    const error = {
      [err.path[0]]: err.message,
    }
    errors.value = {...errors.value, ...error};
  });
}

function clearError(): void {
  errors.value = {};
}

function validate(): boolean | void {
  if (!isTrySubmit.value) return;

  try {
    const clearObject = removeEmptyKeys(payload.value);
    const schema = zod.object({
      author: zod.string(),
      title: zod.string(),
      description: zod.string().min(4, "Descrição deve ter no mínimo 4 caracteres"),
    })

    schema.parse(clearObject)

    clearError();

    return false

  } catch (e) {

    setErrors(e)

    return true;

  }
}

async function submit(): Promise<void> {
  isTrySubmit.value = true;
  const result = validate();

  if (result) return;

  try {
    const resp = await api.post("/post", payload.value)
    const product = resp.data;
    products.value = [...products.value, product]
    payload.value = {...initialPayload};
    isTrySubmit.value = false;
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
      <Label name="Autor"/>
      <Input @input="validate()" name="author" v-model:input-value="payload.author" :error-input="errors['author']"/>
      <Error :error-input="errors['author']"/>
    </Box>

    <Box>
      <Label name="Título"/>
      <Input @input="validate()" name="title" v-model:input-value="payload.title"
             :error-input="errors['title']"/>
      <Error :error-input="errors['title']"/>

    </Box>

    <Box>
      <Label name="Descrição"/>
      <Input @input="validate()" type="textarea" name="description" v-model:input-value="payload.description"
             :error-input="errors['description']"/>
      <Error :error-input="errors['description']"/>
    </Box>

    <button type="submit" style="max-width: 300px">Submit</button>

  </form>
  <div>
    <pre>{{ products }}</pre>
  </div>
</template>

<style scoped>

</style>