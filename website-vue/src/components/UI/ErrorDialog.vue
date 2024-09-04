<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <header><h3>Invalid Input</h3></header>
        <div class="modal-body">
          <div class="pb-3">Unfortunately, at least on input value is invalid.</div>
          <div class="pb-10">
            Please check all inputs and make sure you enter at least a few characters into each
            input field.
          </div>
          <button @click="emit('close-modal')" class="modal-default-button selected">Okay</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'close-modal'): void }>();
</script>

<style scoped>
.modal-container {
  width: 80%;
  margin: 100px;
  background-color: #fff;
  margin: 0px auto;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  vertical-align: middle;
  display: table-cell;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}
.modal-default-button {
  justify-self: end;
}
.modal-body {
  padding: 20px;
  display: grid;
  font-size: large;
}
header h3 {
  color: white;
  font-size: x-large;
  font-weight: bold;
}
header {
  background-color: rgb(63, 1, 92);
  padding: 10px;
  border-radius: 8px 10px 0px 0px;
}
</style>
