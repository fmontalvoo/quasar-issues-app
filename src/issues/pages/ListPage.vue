<script setup lang="ts">
import { ref } from 'vue';

import { useIssues } from '../composables/useIssues';
import { useLabels } from '../composables/useLabels';

import FloatingButtons from '../components/FloatingButtons.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';

import IssueList from '../components/issue-list/IssueList.vue';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';

const { issuesQuery } = useIssues();
const { labelsQuery } = useLabels();

const isOpen = ref<boolean>(false)

const addIssue = () => {
  console.log('Add issue');
  isOpen.value = true;
};
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

  <FloatingButtons :buttons="[
    {
      action: addIssue,
      color: 'primary',
      icon: 'add',
      size: 'md',
    }
  ]" />

  <NewIssueDialog :is-open="isOpen" :labels="labelsQuery.data.value?.map(l => l.name) ?? []" @close="isOpen = false" />
</template>

<style scoped></style>
