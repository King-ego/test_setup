<script setup lang="ts">
import {ref} from "vue";
import {z} from "zod";

import api from "../../services/api.ts";
import {removeEmptyKeys} from "../util";
import Box from "../components/InputItem/Box.vue";
import Label from "../components/InputItem/Label.vue";
import Input2 from "../components/InputItem/Input.vue";
import Error from "../components/InputItem/Error.vue";

const initialPayload = {
  name: "",
  description: "",
  title: "",
};

const products = ref([]);
const errors = ref({});
const payload = ref({...initialPayload});


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
  console.log("bmbmbm")
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
    payload.value = {...initialPayload};
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
    <Box>
      <Label name="name" />
      <Input2 @change="validate()" name="name" v-model:input-value="payload.name" v-model:error-input="errors['name']"/>
      <Error v-model:error-input="errors['name']" />
    </Box>
    <Box>
      <Label name="description" />
      <Input2 name="description" v-model:input-value="payload.description" v-model:error-input="errors['description']"/>
      <Error v-model:error-input="errors['description']" />
    </Box>
    <Box>
      <Label name="title" />
      <Input2 name="title" v-model:input-value="payload.title" v-model:error-input="errors['title']"/>
      <Error v-model:error-input="errors['title']" />
    </Box>
<!--    <Input isLabel name="name" v-model:input-value="payload.name" v-model:error-input="errors"/>
    <Input isLabel name="description" v-model:input-value="payload.description" v-model:error-input="errors"/>
    <Input isLabel name="title" v-model:input-value="payload.title" v-model:error-input="errors"/>-->
    <button type="submit" style="max-width: 300px">Submit</button>
  </form>
  <div>
    <pre>{{ products }}</pre>
  </div>
</template>

<style scoped>

</style>