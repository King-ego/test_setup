<script setup lang="ts">
  import {ref} from "vue";
  import api from "../../services/api.ts";

  const products = ref([]);
  const payload = ref({
    name: "",
    description: "",
  });


 function getProducts() {
    api.get("/post").then(response => {
      products.value = response.data
    });
  }

  async function submit() {
    try {
      const resp = await api.post("/post", payload.value)
      const product = resp.data;
      products.value = [...products.value, product]
    } catch (e) {
      console.log(e);
    }
  }

  function onMounted() {
    getProducts();
  }

  onMounted();
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="payload.name" />
    <input v-model="payload.description" />
    <button type="submit">Submit</button>
  </form>
  <div>
    <pre>{{ products }}</pre>
  </div>
</template>

<style scoped>

</style>