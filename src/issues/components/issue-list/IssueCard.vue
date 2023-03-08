<script setup lang="ts">
import { Issue, State } from 'src/issues/models/issue.model';

defineProps<{
  issue: Issue;
}>();
</script>

<template>
  <q-card class="text-black col-12 q-mb-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="issue.user.avatar_url">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="{ name: 'issue-detail', params: { id: issue.number } }">{{ issue.title }}</router-link>
        </q-item-label>
        <q-item-label caption>
          {{ issue.updated_at }}
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue.comments }}
          </q-item-label>
          <q-chip v-if="issue.state === State.Closed" color="positive" text-color="white" icon="check"> Closed </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report"> Open </q-chip>
        </q-item-label>

      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md">
      <code><pre>{{ issue.body }}</pre></code>
    </q-item-section>

    <q-separator />

    <q-item-section class="q-pa-xs q-gutter-xs">
      <div>
        <q-chip :style="{
          color: `#${label.color}`
        }" v-for="label of issue.labels" :key="label.id">
          {{ label.name }}
        </q-chip>
      </div>
    </q-item-section>

  </q-card>
</template>

<style scoped></style>

