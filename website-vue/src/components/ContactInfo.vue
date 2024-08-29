<script setup lang="ts">
import { ref } from 'vue';
import { Friend } from '../types';
defineProps<{ friend: Friend; friendId: number }>();
const emit = defineEmits<{
  (e: 'toggleFavourite', index: number): void;
  (e: 'deleteContact', index: number): void;
}>();
const detailsVisible = ref(false);

const toggleDetails = () => {
  detailsVisible.value = !detailsVisible.value;
};
// const toggleFavourite = () => {
//   isFavourite.value = !isFavourite.value;
// };
</script>
<style></style>
<template>
  <div>
    <h2>{{ friend.name }} {{ friend.isFavourite ? 'FAVOURITE!' : '' }}</h2>
    <button @click="toggleDetails">{{ detailsVisible ? 'Hide' : 'Show' }} Details</button>
    <button class="font-bold mx-2" @click="emit('toggleFavourite', friendId)">
      {{ friend.isFavourite ? 'Remove From' : 'Add To' }} Favs
    </button>
    <button class="font-bold" @click="emit('deleteContact', friendId)">Delete Me</button>
    <ul v-if="detailsVisible">
      <li><strong>Phone:</strong> {{ friend.phone }}</li>
      <li><strong>Email:</strong> {{ friend.email }}</li>
    </ul>
  </div>
</template>
