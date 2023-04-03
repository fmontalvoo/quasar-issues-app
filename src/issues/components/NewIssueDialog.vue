<script setup lang="ts">
import { ref } from 'vue';

import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

type position = 'top' | 'standard' | 'right' | 'bottom' | 'left'

const title = ref<string>('')
const labels = ref<string[]>([])
const description = ref<string>('')


const isOpen = ref<boolean>(true)
const position = ref<position>('bottom')

</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="isOpen" :position="position" persistent>
      <q-card style="width: 500px">
        <q-form>
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold">New Issue</div>
              <div class="text-grey">Add new issue</div>
            </div>

            <q-space />

            <q-input dense class="q-mb-sm" filled v-model="title" label="Title" />
            <q-select dense class="q-mb-sm" filled v-model="labels" multiple :options="[]" use-chips stack-label
              label="Labels" />

            <MdEditor v-model="description" placeholder="# Markdown" language="en-US" />
          </q-card-section>

          <q-card-actions class="row" align="right">
            <q-btn flat label="Cancel" color="seconf" @click="isOpen = false" />
            <!-- <q-space /> -->
            <q-btn flat label="Add" color="primary" @click="isOpen = false" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<style scoped></style>
