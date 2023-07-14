<script setup lang="ts">
import { useWebSocketStore } from '~/stores/websocketStore';

const webSocketState = useWebSocketStore();

const bitrate = computed(() => (webSocketState.total.bitrate / 1000).toFixed(2));
</script>

<template>
  <v-card>
    <v-card-text>
      <params-row
        title="Bitrate"
        :value="bitrate"
        units="Mbit/s"
      />
      <params-row
        title="TSID"
        :value="webSocketState.tsid"
      />
      <params-row
        title="CC Errors"
        :value="webSocketState.total.cc_errors"
      />
    </v-card-text>
    <v-divider />
    <v-card-title>{{ webSocketState.services[0].descriptors[0].service_name || '' }}</v-card-title>
    <v-divider />
    <v-card-text>
      <params-row
        title="PNR"
        :value="webSocketState.pnr"
      />
      <params-row
        title="Provider"
        :value="webSocketState.services[0].descriptors[0].service_provider || ''"
      />
      <params-row
        title="PMT PID"
        :value="webSocketState.pid"
      />
      <params-row
        title="PCR PID"
        :value="webSocketState.pcr"
      />
      <params-row
        title="Descriptor"
        :value="webSocketState.descriptors[0].data || ''"
      />
    </v-card-text>
  </v-card>
</template>

<style scoped lang="less"></style>
