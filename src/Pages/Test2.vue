<script setup lang="ts">
import {ref} from "vue";
import api from "../../services/api.ts";

interface Card {
  id: number
  title: string
  author: string
  description: string
}

const cards = ref<Card[]>([])

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
  <div v-for="card in cards">
    <div :key="card?.id">
      <p>{{ card?.title }}</p>
      <p>{{ card?.author }}</p>
      <p>{{ card?.description }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>