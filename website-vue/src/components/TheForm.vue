<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !isUserNameValid }">
      <label for="user-name">Your Name</label>
      <input
        id="user-name"
        name="user-name"
        type="text"
        v-model.trim="userName"
        @blur="validateInput('name')"
        @focus="() => (isUserNameValid = true)"
      />
      <p>{{ isUserNameValid ? '&nbsp;' : 'Please enter a user name' }}</p>
    </div>
    <div class="form-control" :class="{ invalid: !isUserAgeValid }">
      <label for="age">Your Age (Years)</label>
      <input
        id="age"
        name="age"
        type="number"
        v-model="userAge"
        @blur="validateInput('age')"
        @focus="() => (isUserAgeValid = true)"
      />
      <transition name="fade">
        <p v-if="!isUserAgeValid">Please enter a valid age (0 - 100)</p>
      </transition>
    </div>
    <div class="form-control">
      <label for="referrer">How did you hear about us?</label>
      <select id="referrer" name="referrer" v-model="referrer">
        <option value="google">Google</option>
        <option value="wom">Word of mouth</option>
        <option value="newspaper">Newspaper</option>
      </select>
    </div>
    <div class="form-control">
      <label>What are you interested in?</label>
      <div>
        <input
          id="interest-news"
          name="interest"
          type="checkbox"
          value="news"
          v-model="interests"
        />
        <label for="interest-news">News</label>
      </div>
      <div>
        <input
          id="interest-tutorials"
          name="interest"
          type="checkbox"
          value="tutorials"
          v-model="interests"
        />
        <label for="interest-tutorials">Tutorials</label>
      </div>
      <div>
        <input
          id="interest-nothing"
          name="interest"
          type="checkbox"
          value="nothing"
          v-model="interests"
        />
        <label for="interest-nothing">Nothing</label>
      </div>
    </div>
    <div class="form-control">
      <label>How do you learn?</label>
      <div>
        <input id="how-video" name="how" type="radio" value="video" v-model="how" />
        <label for="how-video">Video Courses</label>
      </div>
      <div>
        <input id="how-blogs" name="how" type="radio" value="blogs" v-model="how" />
        <label for="how-blogs">Blogs</label>
      </div>
      <div>
        <input id="how-other" name="how" type="radio" value="other" v-model="how" />
        <label for="how-other">Other</label>
      </div>
    </div>
    <div>
      <input id="confirm-terms" name="confirm-terms" type="checkbox" v-model="confirm" />
      <label for="confirm-terms">Agree to terms of use? </label>
    </div>
    <div>
      <button>Save Data</button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';

const userName = ref<string>('');
const userAge = ref<number>();
const referrer = ref<string>('wom');
const interests = ref<string[]>([]);
const how = ref<string>();
const confirm = ref<boolean>(false);
const isUserNameValid = ref<boolean>(true);
const isUserAgeValid = ref<boolean>(true);
const validateInput = (type: 'name' | 'age') => {
  switch (type) {
    case 'name':
      if (userName.value.length === 0) isUserNameValid.value = false;
      else isUserNameValid.value = true;
      break;
    case 'age':
      if (!userAge.value || userAge.value > 100 || userAge.value < 0) isUserAgeValid.value = false;
      else isUserAgeValid.value = true;
      break;
  }
};
watch(userAge, () => validateInput('age'));
const submitForm = () => {
  userAge.value = undefined;
  userName.value = '';
  referrer.value = 'wom';
  interests.value = [];
  how.value = undefined;
  confirm.value = false;
};
</script>
<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
}

.form-control {
  margin: 0.5rem 0;
}
.form-control.invalid input {
  border: 1px solid red;
}
.form-control.invalid p {
  color: red;
}
.form-control.invalid label {
  color: red;
}
label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
select {
  width: auto;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>
