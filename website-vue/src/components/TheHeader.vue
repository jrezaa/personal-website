<template>
  <header>
    <slot></slot>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
header {
  top: 0;
  background-color: #670707;
  color: white;
  justify-content: center;
  display: flex;
  height: 100px;
  align-items: center;
  font-size: xx-large;
  font-weight: bolder;
}
</style>
