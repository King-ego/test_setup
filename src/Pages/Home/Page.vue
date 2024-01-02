<script setup lang="ts">


import {ref} from "vue";
import * as zod from "zod";
import {AxiosResponse} from "axios";

import api from "../../../services/api.ts";
import {removeEmptyKeys} from "../../util";
import setErrors from "../../util/setErrors.ts"

import Box from "../../components/InputItem/Box.vue";
import Label from "../../components/InputItem/Label.vue";
import Input from "../../components/InputItem/InputValue.vue";
import Error from "../../components/InputItem/Error.vue";

const initialPayload = {
  author: "",
  description: "",
  title: "",
};

const products = ref([]);
const errors = ref({});
const payload = ref({...initialPayload});
const isTrySubmit = ref(false);

const id = window.location.pathname.split('/').pop();



function setCard():void{
  if(!id) return;
  api.get(`/post/${id}`).then((resp) => payload.value = resp.data)
}

function clearErrors(): void {
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

    clearErrors();

    return false

  } catch (e) {

    errors.value = setErrors(e)

    return true;

  }
}

async function submit(): Promise<void> {
  isTrySubmit.value = true;
  const isValidate = validate();

  if (isValidate) return;

  try {
    let resp: AxiosResponse;
    if (id) {
      resp = await api.patch(`/post/${id}`, payload.value)
    } else {
      resp = await api.post("/post", payload.value)
      payload.value = {...initialPayload};
    }
    const product = resp.data;
    products.value = [...products.value, product]
    isTrySubmit.value = false;
  } catch (validationError) {
    console.error("Validation error:", validationError.errors);
  }
}

function onMounted() {
  setCard();
}

onMounted();
</script>

<template>
  <router-link to="/card">Cards</router-link>
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
</template>

<style scoped>

</style>