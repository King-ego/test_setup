<script setup lang="ts">
  import {ref} from "vue";
  import {ICard} from "../../../entities/Cards.ts";
  import api from "../../../../services/api.ts";

  const card = ref<ICard>()
  const id = window.location.pathname.split('/').pop();
  function setCard() {
    api.get(`/post/${id}`).then(response => {
      card.value = response.data
    })
  }
  function onMount() {
    setCard()
  }

  onMount()

</script>

<template>
  <router-link to="/card">voltar</router-link>
  <h1>{{card?.title}}</h1>
  <p>{{card?.description}}</p>
  <router-link :to="`/card/edit/${card?.id}`">editar</router-link>
</template>

<style scoped>

</style>