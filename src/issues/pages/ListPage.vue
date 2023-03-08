<script setup lang="ts">
import IssueList from '../components/issue-list/IssueList.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import { useIssues } from '../composables/useIssues';

const { issuesQuery } = useIssues();
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">GitHub Issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <FilterSelector />
    </div>

    <div class="col-xs-12 col-md-8">
      <span class="text-h5 flex flex-center" style="color:red" v-if="issuesQuery.error.value">
        {{ issuesQuery.error.value }}
      </span>

      <LoaderSpinner v-else-if="issuesQuery.isLoading.value" text="Cargando..." :thickness="5" size="3.5rem" />

      <IssueList v-else :issues="issuesQuery.data.value!" />
    </div>
  </div>
</template>

<style scoped></style>
