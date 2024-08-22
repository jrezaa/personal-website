<script setup lang="ts">
import { computed, ref, watch, type Ref } from 'vue';
let playerHealth = ref(100);
let monsterHealth = ref(100);
let countdown = ref(0);
const monsterDamageMax = 40;
const playerDamageMax = 20;
const monsterHealMax = 20;
const playerHealMax = 40;
let battleLog = ref<
  { action: 'attacks' | 'heals' | 'special attacks'; amount: number; name: string }[]
>([]);
const regularAttack = () => {
  let amount = Math.floor(Math.random() * playerDamageMax);
  monsterHealth.value -= amount;
  addToLog('Player', 'attacks', amount);
  monstersTurn();
};
const monstersTurn = () => {
  const randomChance = Math.random();
  let action: 'attacks' | 'heals' | 'special attacks';
  let amount = 0;
  if (randomChance > 0.5) {
    action = 'attacks';
    amount = Math.floor(Math.random() * monsterDamageMax);
    playerHealth.value -= amount;
  } else {
    action = 'heals';
    amount = Math.floor(Math.random() * monsterHealMax);
    monsterHealth.value += amount;
  }
  addToLog('Monster', action, amount);
  countdown.value && countdown.value--;
};
const heal = () => {
  let amount = Math.floor(Math.random() * playerHealMax) + 5;
  playerHealth.value += amount;
  addToLog('Player', 'heals', amount);
  monstersTurn();
};
watch(monsterHealth, () => {
  if (monsterHealth.value < 0) {
    monsterHealth.value = 0;
    alert('YOU WIN!!');
    resetGame();
  } else if (monsterHealth.value > 100) monsterHealth.value = 100;
});
watch(playerHealth, () => {
  if (playerHealth.value < 0) {
    playerHealth.value = 0;
    alert('YOU LOSE :(');
    resetGame();
  } else if (playerHealth.value > 100) playerHealth.value = 100;
});

const resetGame = () => {
  playerHealth.value = 100;
  monsterHealth.value = 100;
  battleLog.value = [];
  countdown.value = 0;
};
const specialAttack = () => {
  countdown.value = 4;
  const amount = Math.floor(Math.random() * playerDamageMax * 2 + 20);
  monsterHealth.value -= amount;
  addToLog('Player', 'special attacks', amount);
  monstersTurn();
};

const addToLog = (
  name: string,
  action: 'attacks' | 'special attacks' | 'heals',
  amount: number
) => {
  battleLog.value.unshift({ name, action, amount });
};
const monsterBarStyles = computed(() => ({ width: monsterHealth.value + '%' }));
const playerBarStyles = computed(() => ({ width: playerHealth.value + '%' }));
</script>

<template>
  <body>
    <header>
      <h1>Monster Slayer</h1>
    </header>
    <div id="game">
      <section id="monster" class="container">
        <h2>Monster Health</h2>
        <div class="healthbar">
          <div class="healthbar__value" :style="monsterBarStyles"></div>
        </div>
      </section>
      <section id="player" class="container">
        <h2>Your Health</h2>
        <div class="healthbar">
          <div class="healthbar__value" :style="playerBarStyles"></div>
        </div>
      </section>
      <section id="controls">
        <button @click="regularAttack">ATTACK</button>
        <button :disabled="countdown !== 0" @click="specialAttack()">SPECIAL ATTACK</button>
        <button @click="heal">HEAL</button>
        <button>SURRENDER</button>
      </section>
      <section id="log" class="container">
        <h2>Battle Log</h2>
        <ul>
          <li v-for="{ action, amount, name } of battleLog" :key="`${action}-${amount}-${name}`">
            <span
              :class="{ 'log--monster': name === 'Monster', 'log--player': name === 'Player' }"
              >{{ name + ' ' }}</span
            >
            <span>{{ action + ' for ' }}</span>
            <span
              :class="{
                'log--damage': action === 'attacks' || action === 'special attacks',
                'log--heal': action === 'heals'
              }"
            >
              {{ amount }}
            </span>
          </li>
        </ul>
      </section>
    </div>
  </body>
</template>

<style scoped>
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
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

section {
  width: 90%;
  max-width: 40rem;
  margin: auto;
}

.healthbar {
  width: 100%;
  height: 40px;
  border: 1px solid #575757;
  margin: 1rem 0;
  background: #fde5e5;
}

.healthbar__value {
  background-color: #00a876;
  width: 100%;
  height: 100%;
}

.container {
  text-align: center;
  padding: 0.5rem;
  margin: 1rem auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
}

#monster h2,
#player h2 {
  margin: 0.25rem;
}

#controls {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

button {
  font: inherit;
  border: 1px solid #88005b;
  background-color: #88005b;
  color: white;
  padding: 1rem 2rem;
  border-radius: 12px;
  margin: 1rem;
  width: 12rem;
  cursor: pointer;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.26);
}

button:focus {
  outline: none;
}

button:hover,
button:active {
  background-color: #af0a78;
  border-color: #af0a78;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.26);
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  box-shadow: none;
  color: #3f3f3f;
  cursor: not-allowed;
}

#log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

#log li {
  margin: 0.5rem 0;
}

.log--player {
  color: #7700ff;
}

.log--monster {
  color: #da8d00;
}

.log--damage {
  color: red;
}

.log--heal {
  color: green;
}

.disabled {
  pointer-events: none;
  background: #4e4e4e;
}
</style>
