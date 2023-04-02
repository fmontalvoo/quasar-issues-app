<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render';

import { Comment, Issue, State } from 'src/issues/models/issue.model';
import { timeSince } from 'src/utils/time-since';

defineProps<{
  comment: Comment;
}>();
</script>

<template>
  <q-card class="text-black col-12 q-mb-md" flat bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img :src="comment.user.avatar_url">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label caption>
          {{ timeSince(comment.updated_at.toString()) }} ago
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-item-section class="q-pa-md markdown">
      <vue-markdown :source="comment.body ?? ''" />
    </q-item-section>

    <q-separator />
  </q-card>
</template>

<style>
.markdown img {
  width: 250px !important;
}
</style>
