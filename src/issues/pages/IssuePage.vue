<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';

defineProps<{
  id: number;
}>();
</script>

<template>
  <div>
    <h2>{{ id }}</h2>
    <LoaderSpinner text="" :thickness="3" size="50px" color="white" />
    <router-link class="text-white" :to="{ name: 'issues-list' }">Go to issues</router-link>
    <IssueCard />
    <LoaderSpinner text="" :thickness="1" size="2rem" color="white" />
    <div class="column">
      <span class="text-h5 q-mb-md">Comments (7)</span>
    </div>
  </div>
</template>

<style scoped></style>
