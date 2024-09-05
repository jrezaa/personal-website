<template>
  <TheHeader title="RememberMe"></TheHeader>
  <BaseCard>
    <template #header>
      <button
        @click="selectPage('stored-resources')"
        :class="{ selected: selectedPage === 'stored-resources' }"
      >
        Stored Resources
      </button>
      <button
        @click="selectPage('add-resource')"
        :class="{ selected: selectedPage === 'add-resource' }"
      >
        Add Resource
      </button>
    </template>
  </BaseCard>
  <keep-alive>
    <component :is="selectedComponent" @delete-resource="deleteResource"></component>
  </keep-alive>
</template>

<script setup lang="ts">
import TheHeader from './components/layouts/TheHeader.vue';
import BaseCard from './components/UI/BaseCard.vue';
import { DefineComponent, provide, ref, shallowRef } from 'vue';
import StoredResources from './components/pages/StoredResources.vue';
import AddResource from './components/pages/AddResource.vue';
import { Resource } from './types';
type DynamicComponentProps = AddResourceProps | StoredResourceProps;
type AddResourceProps = {};
type StoredResourceProps = {
  resources: Resource[];
};
const selectedPage = ref('stored-resources');
const selectedComponent = shallowRef<DefineComponent<DynamicComponentProps>>(
  StoredResources as DefineComponent
);
const selectPage = (pageName: string) => {
  selectedPage.value = pageName;
  selectedComponent.value =
    pageName === 'stored-resources'
      ? (StoredResources as DefineComponent)
      : (AddResource as DefineComponent);
};
const resources = ref<Resource[]>([
  {
    title: 'Official Guide',
    description: 'The official vue.js documentation',
    link: 'https://vuejs.org/guide/introduction.html',
    id: 'official-guide'
  }
]);
const addResource = (resource: Resource) => {
  selectPage('stored-resources');
  resources.value.unshift(resource);
};
const deleteResource = (id: string) => {
  console.log(id);
  resources.value = resources.value.filter((val) => val.id !== id);
};
provide('resources', resources);
provide('addResource', addResource);
// const currentProperties = computed(() => {
//   if (selectedPage.value === 'stored-resources') {
//     return { resources: resources.value };
//   }
//   return undefined;
// });
</script>

<style scoped></style>
