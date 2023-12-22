<template>
  <div class="container">
    <div class="item" @click="changeTab('text')">Test</div>
    <div class="item" @click="changeTab('text2')">Test2</div>
  </div>
  <component :is="Component" />
</template>

<script setup>
import {computed, ref} from "vue";

  import Test from "./Pages/Test.vue";
  import Test2 from "./Pages/Test2.vue";

  const currentTab = ref("text");

  function changeTab(tab) {
    currentTab.value = tab;
  }

  const Component = computed(() => {
    if(currentTab.value === "text") {
      return Test;
    }
    return Test2;
  })
</script>

<style>
  .container {
    display: flex;
    gap: 20px;
  }

  .item {
    background: #9ba8a7;
    padding-inline: 7px;
    padding-block: 5px;
    cursor: pointer;
  }
</style>
