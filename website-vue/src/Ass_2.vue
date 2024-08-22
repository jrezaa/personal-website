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
let ass2Val = ref('');
let ass2Val2 = ref('');
const clickFunction = () => {
  if (iterator.value === clickText.length) {
    iterator.value = 0;
    currText.value = [];
    return;
  }
  currText.value.push(clickText[iterator.value++]);
};
const alertUser = ($event: Event, message: string) => {
  alert(message);
};
watch(iterator, (val) => {
  val % 2 === 0 && console.log(val);
});
const onEnter = ($event: Event) => {
  ass2Val2.value = ($event.target as HTMLInputElement).value;
};

const resetInputs = () => {
  ass2Val.value = '';
  ass2Val2.value = '';
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
        ASSIGNMENT 2:
        <section id="assignment" class="pb-10">
          <h2>Event Practice</h2>
          <!-- 1) Show an alert (any text of your choice) when the button is pressed -->
          <button @click="alertUser($event, 'OH NO! YOU CLIKCED ME AGAIN!!!!')">Show Alert</button>
          <hr />
          <!-- 2) Register the user input on "keydown" and output it in the paragraph (hint: event.target.value helps) -->
          <input type="text" v-model="ass2Val" class="text-black" />
          <p>OUTPUT: {{ ass2Val }}</p>
          <hr />
          <!-- 3) Repeat 2) but only output the entered value if the ENTER key was pressed -->
          <input type="text" @keyup.enter="onEnter" :value="ass2Val2" class="text-black" />
          <p>OUTPUT: {{ ass2Val2 }}</p>
          <button @click="resetInputs">RESET INPUT</button>
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
