<script setup lang="ts">
import {ref} from "vue";
import api from "../../../services/api.ts";
import {ICard} from "../../entities/Cards.ts";


const cards = ref<ICard[]>([])

function setCards() {
  api.get("/post").then(response => {
    cards.value = response.data
  })
}

function onMount() {
  setCards()
}

onMount();

</script>

<template>
  <router-link to="/">Add</router-link>
  <div v-for="card in cards">
    <div :key="card?.id">
      <p>{{ card?.title }}</p>
      <p>{{ card?.author }}</p>
      <p>{{ card?.description }}</p>
      <router-link :to="`/card/${card?.id}`">View</router-link>
    </div>
  </div>
  <pre>{{cards}}</pre>
</template>

<style scoped>

</style>