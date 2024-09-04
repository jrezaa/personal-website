<template>
  <ul>
    <li v-for="resource of resources" :key="resource.id">
      <BaseCard>
        <template #header>
          <div class="header">
            <h2>{{ resource.title }}</h2>
            <button @click="$emit('delete-resource', resource.id)">Delete</button>
          </div>
        </template>
        <template #default>
          <p>{{ resource.description }}</p>
          <nav>
            <a :href="resource.link" target="_blank">View Resource</a>
          </nav>
        </template>
      </BaseCard>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Resource } from '../../types';
import BaseCard from '@components/UI/BaseCard.vue';

const resources: Resource[] | undefined = inject('resources');
</script>

<style scoped>
h2 {
  font-size: x-large;
  font-weight: bold;
}
button {
  color: rgb(0, 200, 255);
}

button:hover {
  color: rgb(144, 0, 255);
  transition: all 0.5s;
  background-color: transparent;
}
.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
a {
  color: rgb(255, 132, 0);
}
</style>
