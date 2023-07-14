<script setup lang="ts">
const props = defineProps<{
    title: string;
    value: string | number;
    units?: string;
  }>();

const unit = props.units ? ` ${props.units}` : '';
</script>

<template>
  <v-row>
    <v-col class="font-weight-bold">
      {{ title }}
    </v-col>
    <v-col>{{ value }}{{ unit }}</v-col>
  </v-row>
</template>

<style scoped lang="less">

</style>
