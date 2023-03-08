<script setup lang="ts">
import IssueCard from './IssueCard.vue';
import { Issue } from 'src/issues/models/issue.model';

defineProps<{
  issues: Issue[];
}>();
</script>

<template>
  <div class="row">
    <IssueCard v-for="issue of issues" :issue="issue" :key="issue.id" />
  </div>
</template>

<style scoped></style>
