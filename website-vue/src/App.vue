<script setup lang="ts">
import { reactive, ref } from 'vue';
import ContactInfo from './components/ContactInfo.vue';
import ContactForm from './components/ContactForm.vue';
import { Friend } from './types';

const friends = reactive<Friend[]>([
  {
    id: 'manual',
    name: 'Manual Lorenz',
    phone: '289 111 1234',
    email: 'manual@localhost.com',
    isFavourite: true
  },
  {
    id: 'julie',
    name: 'Julie Jones',
    phone: '905 123 4444',
    email: 'julie@localhost.com',
    isFavourite: false
  }
]);
const toggleFav = (index: number) => {
  friends[index].isFavourite = !friends[index].isFavourite;
};
const addFriend = (friend: Friend) => {
  friends.push(friend);
  console.log(friends);
};
const deleteContact = (index: number) => {
  friends.splice(index, 1);
};
</script>

<template>
  <section id="app">
    <header>
      <h1>FriendList</h1>
    </header>
    <ContactForm @new-friend="addFriend" />
    <ul>
      <li v-for="(friend, index) of friends" :key="friend.id">
        <ContactInfo
          :friend="friend"
          :friend-id="index"
          @toggle-favourite="toggleFav"
          @delete-contact="deleteContact"
        />
      </li>
    </ul>
  </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jost&display=swap');
* {
  box-sizing: border-box;
}

html {
  font-family: 'Jost', sans-serif;
}

body {
  margin: 0;
}

header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 3rem auto;
  border-radius: 10px;
  padding: 1rem;
  background-color: #58004d;
  color: white;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

#app li {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  margin: 1rem auto;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  width: 90%;
  max-width: 40rem;
}

#app h2 {
  font-size: 2rem;
  border-bottom: 4px solid #ccc;
  color: #58004d;
  margin: 0 0 1rem 0;
}

#app button {
  font: inherit;
  cursor: pointer;
  border: 1px solid #ff0077;
  background-color: #ff0077;
  color: white;
  padding: 0.05rem 1rem;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.26);
  border-radius: 5px;
}

#app button:hover,
#app button:active {
  background-color: #ec3169;
  border-color: #ec3169;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}
#app input {
  border: 2px solid black;
  border-radius: 5px;
  padding-inline: 10px;
}
</style>
