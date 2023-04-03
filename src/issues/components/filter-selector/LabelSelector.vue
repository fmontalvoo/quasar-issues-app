<script setup lang="ts">
import { useLabels } from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const { labelsQuery, selectedLabels, toggleLabel } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <span class="text-h5 flex flex-center" style="color:red" v-if="labelsQuery.error.value">
      {{ labelsQuery.error.value }}
    </span>

    <LoaderSpinner v-else-if="labelsQuery.isLoading.value" text="" :thickness="1" size="50px" />

    <q-chip v-else :style="{
      color: `#${label.color}`
    }" v-for="label of labelsQuery.data.value" :key="label.id" :outline="!selectedLabels.includes(label.name)"
      @click="toggleLabel(label.name)" clickable>
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped></style>
