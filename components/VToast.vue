<template>
  <v-snackbar
    v-model="show"
    :timeout="timeout as number"
    variant="text"
  >
    <v-alert
      density="compact"
      :type="type"
      :title="title"
      :text="text"
    />
  </v-snackbar>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useToastStore } from '~/stores/toastStore';

const toastStore = useToastStore();
const { show, text, timeout, type, title } = storeToRefs(toastStore);
</script>
