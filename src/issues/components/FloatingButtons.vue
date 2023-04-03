<script setup lang="ts">
interface FabButton {
  action: () => void;
  color?: string;
  icon: string;
  size?: string;
}

defineProps<{ buttons: FabButton[]; }>();
</script>

<template>
  <div class="q-pa-md q-gutter-sm fab">
    <q-btn v-for="({ icon, color, size, action }, index) of buttons" :key="index + icon" round :color="color ?? 'primary'"
      :icon="icon" :size="size ?? 'md'" @click="action()" />
  </div>
</template>

<style scoped>
.fab {
  right: 30px;
  bottom: 30px;
  position: fixed;
}
</style>
