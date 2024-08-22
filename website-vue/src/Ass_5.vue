<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';

const headerName = 'My Course Goal';
const link = 'https://www.google.com';
const clickText = [
  'Why did you click me?',
  'Please stop.',
  'OW! That one hurt!',
  "DON'T DO THAT AGAIN!",
  'Okay I am done talking...',
  'GOODBYE!'
];
let currText: Ref<string[]> = ref([]);
let iterator = ref(0);

const clickFunction = () => {
  if (iterator.value === clickText.length) {
    iterator.value = 0;
    currText.value = [];
    return;
  }
  currText.value.push(clickText[iterator.value++]);
};

watch(iterator, (val) => {
  val % 2 === 0 && console.log(val);
});
let currTask = ref('');
let taskList = ref<string[]>([]);
let listVisible = ref(true);
const addTaskToList = () => {
  taskList.value.push(currTask.value);
};
let toggleVisibility = () => {
  listVisible.value = !listVisible.value;
};
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <h1>Vue Course Goals</h1>
    </div>
  </header>

  <main>
    <p>{{ headerName }}</p>
    <span>Let's go to <a :href="link">GOOGLE</a></span>
    <br />
    <span @click="clickFunction()" class="cursor-pointer">CLICK ME</span>
  </main>
  <body>
    <div class="w-full text-center text-xl">
      <h1 v-for="text of currText" :key="text">{{ text }}</h1>
    </div>
    <div>
      <h1 class="py-10">ASSIGNMENTS:</h1>
      <div class="pl-5">
        ASSIGNMENT 5:
        <section id="assignment">
          <h2>Assignment</h2>
          <!-- 1) Add code to manage a list of tasks in a Vue app -->
          <!-- When clicking "Add Task" a new task with the entered text should be added -->
          <input type="text" v-model="currTask" class="text-blue-500" />
          <button @click="addTaskToList">Add Task</button>
          <ul v-if="listVisible">
            <li v-for="task of taskList" :key="task">{{ task }}</li>
          </ul>
          <!-- 3) When the below button is pressed, the list should be shown or hidden -->
          <!-- BONUS: Also update the button caption -->
          <button @click="toggleVisibility">{{ listVisible ? 'Hide' : 'Show' }}</button>
        </section>
      </div>
    </div>
  </body>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
button {
  background: #f4d29c;
  color: black;
  border: 2px solid rgb(214, 110, 12);
  border-radius: 4px;
  padding: 5px 10px;
}
</style>
