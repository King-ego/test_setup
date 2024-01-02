<script setup lang="ts">
import * as zod from "zod";

import Box from "../../../components/InputItem/Box.vue";
import Label from "../../../components/InputItem/Label.vue";
import Input from "../../../components/InputItem/InputValue.vue";
import {ref} from "vue";
import {removeEmptyKeys} from "../../../util";
import setErrors from "../../../util/setErrors";
import Error from "../../../components/InputItem/Error.vue";


const initialPayload = {
  email: "",
  password: "",
}

const payload = ref({...initialPayload})
const errors = ref({});
const isTrySubmit = ref(false);

const clearErrors = (): void => {
  errors.value = {}
}


const validate = (): boolean => {
  if (!isTrySubmit.value) return;
  const clearPayload = removeEmptyKeys(payload.value)
  try {
    const schema = zod.object({
      email: zod.string().email("formato invalido"),
      password: zod.string().min(7, "Senha muito curta")
    })
    schema.parse(clearPayload);
    clearErrors();
    return false;
  } catch (e) {
    errors.value = setErrors(e);
    return true
  }
}

const isSubmit = (): void => {
  clearErrors()
  payload.value = initialPayload;
  isTrySubmit.value = false;
}

function onSubmit(): void {
  console.log(payload)
  isTrySubmit.value = true;

  const isValidate = validate()

  if (isValidate) return

  try {
    console.log(payload.value)
    isSubmit();
  } catch (validationError) {
    console.error("Validation error:", validationError.errors);
  }
}

</script>

<template>
  <form @submit.prevent="onSubmit">
    <Box>
      <Label name="Email"/>
      <Input @input="validate" v-model:input-value="payload.email" name="email" :error-input="errors['email']"/>
      <Error :error-input="errors['email']"/>
    </Box>
    <Box>
      <Label name="Senha"/>
      <Input @input="validate" v-model:input-value="payload.password" name="password" :error-input="errors['password']"/>
      <Error :error-input="errors['password']"/>
    </Box>
    <button type="submit">enviar</button>
  </form>
</template>

<style scoped lang="less">

</style>