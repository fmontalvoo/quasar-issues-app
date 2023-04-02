<script setup lang="ts">
import { useIssue } from '../composables/useIssue';

import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import IssueCommentCard from 'src/issues/components/issue-list/IssueCommentCard.vue';

const props = defineProps<{
  id: number;
}>();

const { issueQuery, commentsQuery } = useIssue(props.id);
</script>

<template>
  <div>
    <h2>{{ id }}</h2>
    <router-link class="text-white" :to="{ name: 'issues-list' }">Go to issues</router-link>
    <LoaderSpinner v-if="issueQuery.isLoading.value" text="" :thickness="3" size="50px" color="white" />
    <span class="text-h5 flex flex-center" style="color:red" v-else-if="issueQuery.error.value">
      {{ issueQuery.error.value }}
    </span>
    <IssueCard v-else :issue="issueQuery.data.value!" />
    <div class="column">
      <LoaderSpinner v-if="commentsQuery.isLoading.value" text="" :thickness="1" size="2rem" color="white" />
      <span class="text-h5 flex flex-center" style="color:red" v-else-if="issueQuery.error.value">
        {{ issueQuery.error.value }}
      </span>
      <div v-else>
        <span class="text-h5 q-mb-md">Comments ({{ issueQuery.data.value?.comments }})</span>
        <IssueCommentCard v-for="comment of commentsQuery.data.value" :key="comment.id" :comment="comment" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
