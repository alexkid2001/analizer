<template>
  <v-layout>
    <v-app-bar color="primary" title="Analyze">
      <v-spacer />
      <v-btn icon @click="handleOpenDialog">
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
      <options-popup v-model="dialog" @close="dialog = false" />
    </v-app-bar>
    <v-main style="min-height: 300px" class="p-2">
      <v-container>
        <v-row>
          <DygraphChart :new-rate="newRate" />
        </v-row>
        <v-row>
          <v-col v-if="streams.length" align-self="center" cols="6">
            <GeneralInfoBlock />
          </v-col>
          <v-col
            v-for="stream in streams"
            :key="stream.type_name === 'VIDEO' ? stream.descriptors[0].data : stream.descriptors[1].data"
            cols="6"
          >
            <StreamSection v-bind="stream" />
          </v-col>
        </v-row>
      </v-container>
      <v-toast />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import GeneralInfoBlock from '~/components/GeneralInfoBlock.vue';
import { useToastStore } from '~/stores/toastStore';
import { useWebSocketStore } from '~/stores/websocketStore';

interface EnvConfig {
  public: {
    serverUrl: string;
  }
}
//
// const genericInfo = [
//   {
//     title: 'Bitrate',
//     units: 'Mbit/s',
//     value: 33
//   },
//   {
//     title: 'TSIC',
//     value: 25
//   },
//   {
//     title: 'CC errors',
//     value: 0
//   }
// ];

const config: EnvConfig = useRuntimeConfig();
// console.log(process.env, config.serverUrl);
const webSocketStore = useWebSocketStore();

// const socket: WebSocket | null = null;
const toastStore = useToastStore();
const dialog = ref(false);

const handleGetVersion = () => {
  // Send the command
  const command = { cmd: 'version' };
  webSocketStore.sendWebSocketMessage(command);
};

const sendStart = () => {
  const command = { cmd: 'start', address: 'udp://239.100.10.33:5000' };
  webSocketStore.sendWebSocketMessage(command);
};

const sendStop = () => {
  const command = { cmd: 'stop' };
  webSocketStore.sendWebSocketMessage(command);
};

const handleOpenDialog = () => {
  sendStop();
  dialog.value = true;
};

const showMessage = () => { toastStore.showSnackbar({ text: 'test', title: 'Test title', type: 'error' }); };

// Received message: {
// "pid": 18,
//   "table_id": 78,
//   "section_number": 0,
//   "version": 18,
//   "crc32": 1864604478,
//   "last_section_number": 1,
//   "events": [
//   {
//     "event_id": 19944,
//     "stop_ut": 1683443580,
//     "start_ut": 1683442800,
//     "running_status": 4,
//     "descriptors": [
//       {
//         "lang": "bul",
//         "event_name": "Новите Шантави Рисунки",
//         "type_name": "short_event_descriptor",
//         "type_id": 77,
//         "text_char": "Филм, САЩ, 2015"
//       },
//       {
//         "lang": "bul",
//         "type_name": "extended_event_descriptor",
//         "desc_num": 0,
//         "type_id": 78,
//         "text": "Бъгс тръгва по малко познат път и се озовава в поредния сблъсък между Защитните костюми и Голяма стъпка.",
//         "last_desc_num": 0
//       }
//     ],
//     "ca_mode": 0
//   }
// ],
//   "cmd": "analyze",
//   "tsid": 33,
//   "onid": 1,
//   "psi": "eit",
//   "sid": 33
// }
//
// app.vue:32 Received message: {
//   "cmd": "analyze",
//     "rate": [
//     21,
//     21,
//     14,
//     14,
//     14,
//     7,
//     14,
//     14,
//     14,
//     21
//   ]
// }
//

onMounted(() => {
  if (process.client) {
    webSocketStore.connectWebSocket(config.public.serverUrl);
  }
});

const newRate = computed(() => webSocketStore.rate || []);

const streams = computed(() => webSocketStore.streams);
</script>
