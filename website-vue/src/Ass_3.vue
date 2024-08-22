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
let numberVal = ref(0);
const add = (num: number) => {
  numberVal.value += num;
};
const endVal = computed(() => {
  if (numberVal.value < 37) return 'NOT THERE YET!';
  else if (numberVal.value > 37) return 'TOO MUCH!!';
  else return numberVal;
});
watch(numberVal, (curr) => {
  curr &&
    setTimeout(() => {
      numberVal.value = 0;
    }, 5000);
});
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
        ASSIGNMENT 3:
        <section id="assignment" class="pb-5">
          <div class="gap-2 flex">
            <button @click="add(5)">Add 5</button>
            <button @click="add(1)">Add 1</button>
          </div>

          <!-- 1) Connect the buttons and calculate a value (a number) -->
          <!-- Show "Not there yet" until you reach a result of exactly 37 -->
          <!-- Show "Too much!" if the result is greater than 37 -->
          <p>Result: {{ numberVal }} {{ endVal }}</p>
          <!-- 2) Watch for changes in "result" and reset the value to 0 after 5 seconds -->
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
