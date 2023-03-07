<script setup lang="ts">
import { useLabels } from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const { labels } = useLabels();
</script>

<template>
  <LoaderSpinner text="" :thickness="1" size="50px" />

  <q-chip color="primary" v-for="label of 10" :key="label" outline clickable>
    Chip
  </q-chip>
</template>

<style scoped></style>
