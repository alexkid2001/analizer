<template>
  <v-layout>
    <v-app-bar color="primary" title="Application bar"></v-app-bar>

    <v-navigation-drawer color="primary">
      <v-list>
        <v-list-item title="Drawer left"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main style="min-height: 300px" class="p-2">
      <v-container>
        <v-row>
          <v-col>
            <v-defaults-provider :defaults="genericInfo">
              <GeneralInfoBlock />
            </v-defaults-provider>
          </v-col>
          <v-col>
            <v-btn @click="sendCommand">Send command</v-btn>
            <v-btn @click="sendStart">Start</v-btn>
            <v-btn @click="sendStop">Stop</v-btn>
            <ClientOnly fallback-tag="div" fallback="Loading component...">
              <DygraphChart />
            </ClientOnly>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
import GeneralInfoBlock from "~/components/GeneralInfoBlock.vue";

const genericInfo = [
  {
    title: "Bitrate",
    units: "Mbit/s",
    value: 33,
  },
  {
    title: "TSIC",
    value: 25,
  },
  {
    title: "CC errors",
    value: 0,
  },
];

let socket: WebSocket | null = null;

const initSocket = () => {
  socket = new WebSocket("ws://bg.cesbo.com:8004/api/");

  socket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  socket.onmessage = (event) => {
    console.log("Received message:", event.data);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };
};
const sendCommand = () => {
  // Send the command
  const command = { cmd: "version" };
  if (!socket) {
    console.log("InitSocket");
    initSocket();
  }
  socket?.send(data: JSON.stringify(command));
};

const sendStart = () => {
  const command = { cmd: "start", address: "udp://239.100.10.33:5000" };
  socket?.send(JSON.stringify(command));
};

const sendStop = () => {
  const command = { cmd: "stop" };
  socket?.send(JSON.stringify(command));
};

const setNewDataToChart = () => {};

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
</script>
