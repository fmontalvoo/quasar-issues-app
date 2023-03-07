<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">GitHub Issuess</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">

    </div>

    <div class="col-xs-12 col-md-8">
      <LoaderSpinner text="Cargando..." :thickness="5" size="3.5rem" />
    </div>
  </div>
</template>

<style scoped></style>
