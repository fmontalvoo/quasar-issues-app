<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
</script>

<template>
  <LoaderSpinner text="" :thickness="1" size="50px" />

  <q-chip color="primary" v-for="label of 10" :key="label" outline clickable>
    Chip
  </q-chip>
</template>

<style scoped></style>
