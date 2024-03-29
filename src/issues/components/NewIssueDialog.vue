<script setup lang="ts">
import { ref, toRef, watch } from 'vue';

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import { useCreateIssue } from '../composables/useCreateIssue';

const props = defineProps<{
  isOpen: boolean;
  labels: string[];
}>();

const emits = defineEmits<{
  (event: 'close'): void;
}>();

const { issueMutation } = useCreateIssue();

const title = ref<string>('')
const labels = ref<string[]>([])
const description = ref<string>('')

const isOpen = ref<boolean>(false)

watch(toRef(props, 'isOpen'), (value) => {
  isOpen.value = value;
});

watch(() => issueMutation.isSuccess.value, (isSuccess) => {
  if (isSuccess) {
    title.value = '';
    labels.value = [];
    description.value = '';

    issueMutation.reset();

    emits('close');
  }
});
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" position="bottom" persistent>
      <q-card style="width: 500px">
        <q-form @submit="issueMutation.mutate({ title, description, labels })">
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">New Issue</div>
              <div class="text-grey">Add new issue</div>
            </div>

            <q-space />

            <q-input dense class="q-mb-sm" filled v-model="title" label="Title"
              :rules="[value => !!value || 'Title is required']" />
            <q-select dense class="q-mb-sm" filled v-model="labels" multiple :options="props.labels" use-chips stack-label
              label="Labels" />

            <MdEditor v-model="description" placeholder="# Markdown" language="en-US" />
          </q-card-section>

          <q-card-actions class="row" align="right">
            <q-btn :disable="issueMutation.isLoading.value" flat label="Cancel" color="seconf" @click="emits('close')" />
            <!-- <q-space /> -->
            <q-btn :disable="issueMutation.isLoading.value" flat type="submit" label="Add" color="primary" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
