<script setup lang="ts">
interface Props {
  name: string;
}

defineProps<Props>()
</script>

<template>
  <p>{{ name  }}</p>
</template>

<style scoped>

</style>