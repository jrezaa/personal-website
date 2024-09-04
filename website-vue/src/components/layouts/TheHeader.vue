<template>
  <header>
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<style scoped>
header {
  top: 0;
  background-color: #670707;
  justify-content: center;
  display: flex;
  height: 5rem;
  align-items: center;
  font-size: xx-large;
  font-weight: bold;
}
header h1 {
  margin: 0;
  color: white;
}
</style>
