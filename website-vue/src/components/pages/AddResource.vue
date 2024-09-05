<template>
  <BaseCard>
    <form @submit.prevent="submitResource">
      <div class="pb-4">
        <h2>Title</h2>
        <input type="text" v-model="resource.title" ref="title" />
      </div>
      <div class="pb-4">
        <h2>Description</h2>
        <textarea rows="3" v-model="resource.description"></textarea>
      </div>
      <div class="pb-4">
        <h2>Link</h2>
        <input type="text" v-model="resource.link" />
      </div>

      <button class="selected">Add Resource</button>
    </form>
  </BaseCard>
  <Teleport to="#app">
    <ErrorDialog v-if="invalidInputFields" @close-modal="() => (invalidInputFields = false)">
      <template #header> Invalid Input </template>
      <template #default>
        <p class="pb-3">Unfortunately, at least on input value is invalid.</p>
        <p class="pb-10">
          Please check all inputs and make sure you enter at least a few characters into each input
          field.
        </p></template
      >
    </ErrorDialog>
  </Teleport>
</template>

<script setup lang="ts">
import { inject, reactive, ref, watch } from 'vue';
import BaseCard from '@components/UI/BaseCard.vue';
import { Resource } from 'src/types';
import ErrorDialog from '@components/UI/ErrorDialog.vue';
const addResource: ((val: Resource) => void) | undefined = inject('addResource');
const resource = reactive<Resource>({ title: '', id: '', description: '', link: '' });
const invalidInputFields = ref(false);
const submitResource = () => {
  if (
    resource.title.trim().length === 0 ||
    resource.description.trim().length === 0 ||
    resource.link.trim().length === 0
  ) {
    invalidInputFields.value = true;
    return;
  }
  addResource &&
    addResource({
      title: resource.title,
      description: resource.description,
      link: resource.link,
      id: resource.id
    });
};
const formatID = (text: string) => {
  const trimmed = text.trim().toLowerCase();
  return trimmed.replace(/\s+/g, '-');
};
watch(resource, (val, prevVal) => {
  if (val.title !== prevVal.title) val.id = formatID(val.title);
});
</script>

<style scoped>
h2 {
  font-size: x-large;
  font-weight: bold;
}
input {
  border: 1px solid rgba(108, 108, 108, 0.573);
  border-radius: 2px;
  width: 100%;
  padding-inline: 5px;
  transition: all 0.1s;
}
input:focus {
  background-color: rgba(204, 0, 255, 0.195);
  outline: rgb(102, 0, 128) solid 1px;
}
textarea {
  border: 1px solid rgba(108, 108, 108, 0.573);
  width: 100%;
  padding-inline: 5px;
  border-radius: 2px;
  transition: all 0.1s;
}
textarea:focus {
  background-color: rgba(204, 0, 255, 0.195);
  outline: rgb(102, 0, 128) solid 1px;
}
</style>
