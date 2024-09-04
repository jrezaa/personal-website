<template>
  <div class="card">
    <header>
      <slot name="header"></slot>
    </header>
    <section>
      <slot name="default"></slot>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  box-shadow: 0px 0px 8px 4px rgb(85 85 85 / 31%);
  margin-inline: 50px;
  margin-block: 20px;
  border-radius: 20px;
  padding: 20px;
}
</style>
