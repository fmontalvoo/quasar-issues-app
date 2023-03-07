<script setup lang="ts">
interface Props {
  size?: string;
  text?: string;
  color?: string;
  thickness?: number;
}

const props = withDefaults(defineProps<Props>(), {
  size: '3rem',
  thickness: 2,
  text: 'Loading',
  color: 'primary',
});
</script>

<template>
  <div class="column items-center">
    <q-spinner :color="color" :size="size" :thickness="thickness" />
    <span class="q-mt-sm">{{ text }}</span>
  </div>
</template>

<style scoped></style>
