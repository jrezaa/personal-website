<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Friend } from '../types';
const emit = defineEmits<{ (e: 'newFriend', friend: Friend): void }>();
const emptyFriend = { name: '', phone: '', email: '', isFavourite: false, id: '' };
const friendForm = reactive<Friend>({ name: '', phone: '', email: '', isFavourite: false, id: '' });
const handleSubmit = () => {
  friendForm.id = friendForm.name.split(' ')[0].toLowerCase();
  if (!validForm(friendForm)) {
    alert('Please submit a valid form');
    return;
  }
  emit('newFriend', { ...friendForm });
  friendForm.name = emptyFriend.name;
  friendForm.email = emptyFriend.email;
  friendForm.phone = emptyFriend.phone;
  friendForm.isFavourite = emptyFriend.isFavourite;
  friendForm.id = emptyFriend.id;
};
const validForm = (form: Friend) => {
  return form.email.length > 0 && form.name.length > 0 && friendForm.phone.length > 0;
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <li class="grid grid-cols-2 gap-2">
      <h2 class="col-span-2">Add a new friend</h2>

      <span class="col-start-1"><strong>Name:</strong> </span>
      <input v-model="friendForm.name" class="col-start-2" />
      <span class="col-start-1"><strong>Phone:</strong> </span>
      <input v-model="friendForm.phone" class="col-start-2" />
      <span class="col-start-1"><strong>Email:</strong> </span>
      <input v-model="friendForm.email" class="col-start-2" />
      <span class="col-start-1"><strong>Favourite?</strong> </span>
      <input type="checkbox" v-model="friendForm.isFavourite" class="col-start-2" />
      <button class="col-span-2">Submit</button>
    </li>
  </form>
</template>

<style></style>
