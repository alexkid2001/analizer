<template>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card>
      <v-card-title>
        Dialog 1
      </v-card-title>
      <v-card-text>
        <v-tabs
          v-model="tab"
          color="deep-purple-accent-4"
          align-tabs="center"
        >
          <v-tab :value="1">
            Input Options
          </v-tab>
          <v-tab :value="2">
            DVB Options
          </v-tab>
          <v-tab :value="3">
            UDP/RTP Options
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <DvbOptions :index="2" />
          <DvbOptions :index="3" />
          <v-window-item
            :value="1"
            class="pa-4"
          >
            <form>
              <v-text-field
                v-model="url"
                label="URL"
                placeholder="Input Address (UDP, RTP, HTTP(s), RTSP"
              />
              <div class="d-flex pa-4">
                <v-checkbox-btn
                  v-model="sync"
                />
                <v-text-field
                  class="w-full flex-0-0-100"
                  :disabled="!sync"
                  hide-details
                  label="Sync"
                  placeholder="Sync buffer size in Mb. Default: 1"
                />
              </div>
              <v-text-field
                label="PNR"
                placeholder="Program Number"
              />
              <v-btn
                class="me-4"
                @click="closeDialog"
              >
                Cancel
              </v-btn>
              <v-btn
                class="me-4"
                :disabled="!url"
                @click="sendStart"
              >
                Start
              </v-btn>
            </form>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useWebSocketStore } from '~/stores/websocketStore';

const dialog = ref<boolean>(false);
const tab = ref<number>(1);
const sync = ref<boolean>(false);
const url = ref<string>('');
const emit = defineEmits(['close']);

const webSocketStore = useWebSocketStore();

const closeDialog = () => {
  emit('close');
};
const sendStart = () => {
  const command = { cmd: 'start', address: 'udp://239.100.10.33:5000' };
  webSocketStore.sendWebSocketMessage(command);
  console.log('start', url.value);
  emit('close');
};

</script>
