<script setup lang="ts">
import { useIssuesStore } from 'src/stores/issues';

const store = useIssuesStore();
</script>

<template>
  <q-btn-toggle v-model="store.state" push spread toggle-color="primary" :options="[
    { label: 'All', value: 'all' },
    { label: 'Open', value: 'open' },
    { label: 'Closed', value: 'closed' }
  ]" />
</template>

<style scoped></style>
