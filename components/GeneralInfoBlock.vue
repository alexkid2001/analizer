<script setup lang="ts">
const props = defineProps<{
  genericInfo: Array<any>;
}>();
</script>

<template>
  <v-card>
    <v-card-title>Cartoon Network</v-card-title>
    <v-divider />
    <v-card-text>
      <params-row
        v-for="(info, index) in genericInfo"
        :key="index"
        :title="info.tytpe"
        :value="info.value"
        :units="info.units"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped lang="less"></style>
