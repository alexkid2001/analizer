<script setup lang="ts">
import { useWebSocketStore } from '~/stores/websocketStore';

const props = defineProps<{
  type_name: 'VIDEO',
  pid: number,
  descriptors: Array<{
      data: string,
      type_name: string,
      type_id: number
    }>,

  type_id: number,
} | {
    type_name: 'AUDIO',
    pid: number,
    descriptors: [
      {
        type_name: string,
        lang: string,
        type_id: number
      },
      {
        data: string,
        type_name: string,
        type_id: number
      },
    ],
    type_id: number,
}>();

const webSocketState = useWebSocketStore();
const bitrate = ref(0);
watch(
  () => webSocketState.analyze,
  (analyze) => {
    const curAnalyze = analyze.find(item => item.pid === props.pid);
    if (curAnalyze) {
      bitrate.value = curAnalyze.bitrate;
    }
  }
);

</script>

<template>
  <v-card>
    <v-card-title>Stream {{ `${props.type_name}`.toLowerCase() }}</v-card-title>
    <v-divider />
    <v-card-text>
      <params-row
        title="Type"
        :value="`ISO/IEC 13818-2 Video [0x0${props.type_id}]`"
      />
      <params-row
        title="PID"
        :value="props.pid"
      />
      <params-row
        v-if="props.type_name === 'AUDIO'"
        title="Language"
        :value="props.descriptors[0].lang"
      />
      <params-row
        v-if="props.type_name === 'AUDIO'"
        title="Descriptor"
        :value="props.descriptors[1].data"
      />
      <params-row
        v-if="props.type_name === 'VIDEO'"
        title="Descriptor"
        :value="props.descriptors[0].data"
      />
      <params-row
        title="Bitrate"
        :value="bitrate"
        units="Kbit/s"
      />
      <params-row
        title="Scrambled"
        value="NO"
      />
      <params-row
        title="CC Errors"
        value="0"
      />
      <params-row
        title="PES Errors"
        :value="0"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped lang="less">

</style>
