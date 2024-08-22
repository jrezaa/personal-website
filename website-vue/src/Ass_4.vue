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
let default1 = 'CHECK ME OUT';
let default2 = 'NOOOO CHECK ME OUT';
let default3 = 'PLS TOUCH ME';
let text1 = ref(default1);
let text2 = ref(default2);
let text3 = ref(default3);
const style1 = ref('');
const style2 = ref('');
const style3 = ref('');
const changeText = (num: number, text: string) => {
  if (num === 0) text1.value = text;
  else if (num === 1) text2.value = text;
  else text3.value = text;
};

const focus = (num: number) => {
  switch (num) {
    case 0:
      style1.value = 'border-red-200 text-lg border';
      style2.value = '';
      style3.value = '';
      break;
    case 1:
      style2.value = 'border-red-200 text-lg border';
      style1.value = '';
      style3.value = '';
      break;
    case 2:
      style3.value = 'border-red-200 text-lg border';
      style1.value = '';
      style2.value = '';
      break;
  }
};
const resetText = () => {
  text1.value = default1;
  text2.value = default2;
  text3.value = default3;
  style1.value = '';
  style2.value = '';
  style3.value = '';
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
        ASSIGNMENT 4:
        <section id="assignment" class="pb-5">
          <div
            @click="focus(0)"
            :class="style1 + ' cursor-pointer'"
            @mouseover="changeText(0, 'Yippie!')"
            @mouseout="resetText"
          >
            {{ text1 }}
          </div>
          <div
            @click="focus(1)"
            :class="style2 + ' cursor-pointer'"
            @mouseover="changeText(1, 'OooOOOooOOOOoooOOOOoo YEAH!')"
            @mouseout="resetText"
          >
            {{ text2 }}
          </div>
          <div
            @click="focus(2)"
            :class="style3 + ' cursor-pointer'"
            @mouseover="changeText(2, 'ermagerd!!')"
            @mouseout="resetText"
          >
            {{ text3 }}
          </div>
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
