<script lang="ts" setup>
const props = defineProps<{
  index: number,
}>();

const adapterOptions = [
  '0 : undefined [DVB-S/S2X]',
  '1 : undefined [DVB-S/S2X]',
  '2 : undefined [DVB-S/S2X]',
  '3 : undefined [DVB-S/S2X]'
];

const dvbType = ref();
const handleStartClick = () => {
};
const handleCancelClick = () => {
};
</script>

<template>
  <v-window-item
    :key="props.index"
    :value="props.index"
    class="pa-4"
  >
    <form>
      <v-label>Label</v-label>
      <v-btn-toggle
        v-model="dvbType"
        variant="outlined"
        color="primary"
        mandatory
        divided
        full-width
      >
        <v-btn value="S" class="w-full">
          S
        </v-btn>
        <v-btn value="S2" class="w-full">
          S2
        </v-btn>
        <v-btn value="T" class="w-full">
          T
        </v-btn>
        <v-btn value="T2" class="w-full">
          T2
        </v-btn>
        <v-btn value="C" class="w-full">
          C
        </v-btn>
      </v-btn-toggle>
      <v-combobox
        label="Adapter"
        :items="adapterOptions"
      />
      <v-text-field
        label="URL"
        placeholder="Input Address (UDP, RTP, HTTP(s), RTSP"
      />
      <v-text-field
        label="PNR"
        placeholder="Program Number"
      />
      <v-btn
        class="me-4"
        @click="handleCancelClick"
      >
        Cancel
      </v-btn>
      <v-btn
        class="me-4"
        @click="handleStartClick"
      >
        Start
      </v-btn>
    </form>
  </v-window-item>
</template>
