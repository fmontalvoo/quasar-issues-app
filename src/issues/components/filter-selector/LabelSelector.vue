<script setup lang="ts">
import { useLabels } from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const { labels } = useLabels();
</script>

<template>
  <div class="q-mt-md">
    <span class="text-h5 flex flex-center" style="color:red" v-if="labels.error.value">
      {{ labels.error.value }}
    </span>

    <LoaderSpinner v-else-if="labels.isLoading.value" text="" :thickness="1" size="50px" />

    <q-chip v-else :style="{
      color: `#${label.color}`
    }" v-for="label of labels.data.value" :key="label.id" outline clickable>
      {{ label.name }}
    </q-chip>
  </div>
</template>

<style scoped></style>
