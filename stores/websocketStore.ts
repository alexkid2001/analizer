import { defineStore } from 'pinia';
import { useToastStore } from '~/stores/toastStore';
import { COMMANDS } from '~/constants/commands';

type TotalAnalyze = {
  sc_errors: number,
  scrambled: boolean,
  pcr_errors: number,
  bitrate_limit: number,
  pes_errors: number,
  bitrate: number,
  cc_errors: number,
  packets: number
}

type Analyze = {
  sc_error: number,
  pes_error: number,
  cc_error: number,
  pcr_error: number,
  bitrate: number,
  pid: number,
  packets: number
}

type Services = {
  sid: number,
  descriptors: [
    {
      service_provider: string,
      'service_name': string,
      'type_name': string,
      'service_type_id': number,
      'type_id': number
    }
  ]
}
interface WebsocketStore {
  websocketInstance: WebSocket | null;
  rate: number[],
  commonSection: Record<string, string | number>,
  streams: Record<string, string | number>[],
  sections: Record<string, any>,
  total: TotalAnalyze,
  tsid: number,
  pnr: number,
  pid: number,
  pcr: number,
  analyze: Analyze[],
  services: Services[],
  descriptors: Array<{
      data: string,
      type_name: string,
      type_id: number
    }>
}

export const useWebSocketStore = defineStore('websocket', {
  state: (): WebsocketStore => ({
    websocketInstance: null,
    rate: [],
    commonSection: {},
    streams: [],
    sections: {},
    total: {
      sc_errors: 0,
      scrambled: false,
      pcr_errors: 0,
      bitrate_limit: 0,
      pes_errors: 0,
      bitrate: 0,
      cc_errors: 0,
      packets: 0
    },
    tsid: 0,
    pnr: 0,
    pid: 0,
    pcr: 0,
    analyze: [],
    services: [
      {
        sid: 0,
        descriptors: [
          {
            service_provider: '',
            service_name: '',
            type_name: '',
            service_type_id: 0,
            type_id: 0
          }
        ]
      }
    ],
    descriptors: [
      {
        data: '',
        type_name: '',
        type_id: 0
      }
    ]
  }),

  getters: {
    getWebSocket: state => state.websocketInstance
  },

  actions: {
    connectWebSocket (serverUrl: string) {
      const toastStore = useToastStore();
      try {
        this.websocketInstance = new WebSocket(serverUrl);

        this.websocketInstance.onopen = () => {
          console.log('WebSocket connection opened');
        };

        this.websocketInstance.onmessage = (event) => {
          this.handleWebSocketMessage(event.data);
        };

        this.websocketInstance.onclose = () => {
          console.log('WebSocket connection closed');
        };

        this.sendWebSocketMessage({ cmd: COMMANDS.VERSION });
        this.sendWebSocketMessage({ cmd: COMMANDS.FAV_LIST });
        this.sendWebSocketMessage({ cmd: COMMANDS.ETH_LIST });
        this.sendWebSocketMessage({ cmd: COMMANDS.DVD_LIST });

        toastStore.showSnackbar({ type: 'success', text: 'Connecting successful' });
      } catch (error: any) {
        toastStore.showSnackbar({ type: 'error', text: error.message, title: 'Failed to connect to the server' });
      }
    },
    handleWebSocketMessage (message: string) {
      const {
        cmd,
        rate,
        services,
        descriptors,
        section_number: sectionNumber,
        programs,
        streams,
        total,
        tsid,
        pnr,
        pid,
        pcr,
        analyze
      } = JSON.parse(message);
      if (cmd) {
        if (cmd === 'analyze') {
          if (rate) { this.rate = rate; }

          if (programs) {
            // this.sections['0'].pnr = programs.pnr;
            // this.sections['0'].pid = programs.pid;
          }

          if (descriptors) {
            this.descriptors = descriptors;
          }

          if (streams) {
            this.streams = streams;
            this.pnr = pnr;
            this.pid = pid;
            this.pcr = pcr;
          }

          if (total) {
            this.total = total;
          }

          if (tsid) { this.tsid = tsid; }
          if (analyze) {
            this.analyze = analyze;
          }
          if (services) {
            this.services = services;
          }
        }
      } else if (services) {
        this.services = services;
      }
    },
    sendWebSocketMessage (message: { cmd: string}) {
      if (this.websocketInstance && this.websocketInstance.readyState === WebSocket.OPEN) {
        this.websocketInstance.send(JSON.stringify(message));
      }
    }
  }
  //
  // {
  //   "programs": [
  //     {
  //       "pnr": 33,
  //       "pid": 334
  //     }
  //   ],
  //   "psi": "pat",
  //   "cmd": "analyze",
  //   "table_id": 0,
  //   "crc32": 2224311489,
  //   "pid": 0,
  //   "version": 0,
  //   "tsid": 33
  // }
  //
  //
  // {
  //   "cmd": "analyze",
  //   "descriptors": [
  //     {
  //       "data": "0x0e03c02c27",
  //       "type_name": "unknown",
  //       "type_id": 14
  //     }
  //   ],
  //   "pnr": 33,
  //   "version": 13,
  //   "psi": "pmt",
  //   "table_id": 2,
  //   "streams": [
  //     {
  //       "type_name": "VIDEO",
  //       "pid": 331,
  //       "descriptors": [
  //         {
  //           "data": "0x0e03c00da9",
  //           "type_name": "unknown",
  //           "type_id": 14
  //         }
  //       ],
  //       "type_id": 2
  //     },
  //     {
  //       "type_name": "AUDIO",
  //       "pid": 332,
  //       "descriptors": [
  //         {
  //           "type_name": "lang",
  //           "lang": "bul",
  //           "type_id": 10
  //         },
  //         {
  //           "data": "0x0e03c00171",
  //           "type_name": "unknown",
  //           "type_id": 14
  //         }
  //       ],
  //       "type_id": 3
  //     },
  //     {
  //       "type_name": "AUDIO",
  //       "pid": 336,
  //       "descriptors": [
  //         {
  //           "type_name": "lang",
  //           "lang": "eng",
  //           "type_id": 10
  //         },
  //         {
  //           "data": "0x0e03c00171",
  //           "type_name": "unknown",
  //           "type_id": 14
  //         }
  //       ],
  //       "type_id": 3
  //     }
  //   ],
  //   "pid": 334,
  //   "pcr": 331,
  //   "crc32": 4281791789
  // }
  //
  //
  // {
  //   "section_number": 0,
  //   "services": [
  //     {
  //       "sid": 33,
  //       "descriptors": [
  //         {
  //           "service_provider": "ss",
  //           "service_name": "Cartoon Network",
  //           "type_name": "service",
  //           "service_type_id": 1,
  //           "type_id": 72
  //         }
  //       ]
  //     }
  //   ],
  //   "crc32": 3773170265,
  //   "version": 0,
  //   "psi": "sdt",
  //   "table_id": 66,
  //   "cmd": "analyze",
  //   "pid": 17,
  //   "tsid": 33,
  //   "last_section_number": 0
  // }
  //
  // {
  //   "section_number": 1,
  //   "crc32": 2879988193,
  //   "onid": 1,
  //   "version": 28,
  //   "events": [
  //   {
  //     "start_ut": 1685917500,
  //     "running_status": 1,
  //     "stop_ut": 1685918100,
  //     "ca_mode": 0,
  //     "descriptors": [
  //       {
  //         "event_name": "Невероятният свят на Гъмбол",
  //         "text_char": "Филм, САЩ, 2012",
  //         "type_name": "short_event_descriptor",
  //         "lang": "bul",
  //         "type_id": 77
  //       },
  //       {
  //         "last_desc_num": 0,
  //         "text": "Татко получава първата си работа като разносвач на пици но",
  //         "desc_num": 0,
  //         "type_name": "extended_event_descriptor",
  //         "lang": "bul",
  //         "type_id": 78
  //       }
  //     ],
  //     "event_id": 4420
  //   }
  // ],
  //   "sid": 33,
  //   "psi": "eit",
  //   "table_id": 78,
  //   "cmd": "analyze",
  //   "pid": 18,
  //   "tsid": 33,
  //   "last_section_number": 1
  // }
  //
  //
  //

  // {
  //   "analyze": [
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 7,
  //       "pid": 0,
  //       "packets": 5
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 0,
  //       "pid": 1,
  //       "packets": 0
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 0,
  //       "pid": 16,
  //       "packets": 0
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 7,
  //       "pid": 17,
  //       "packets": 5
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 3,
  //       "pid": 18,
  //       "packets": 2
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 0,
  //       "pid": 20,
  //       "packets": 0
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 24,
  //       "bitrate": 1415,
  //       "pid": 331,
  //       "packets": 941
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 136,
  //       "pid": 332,
  //       "packets": 91
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 7,
  //       "pid": 334,
  //       "packets": 5
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 135,
  //       "pid": 336,
  //       "packets": 90
  //     },
  //     {
  //       "sc_error": 0,
  //       "pes_error": 0,
  //       "cc_error": 0,
  //       "pcr_error": 0,
  //       "bitrate": 97,
  //       "pid": 8191,
  //       "packets": 65
  //     }
  //   ],
  //   "cmd": "analyze",
  //   "on_air": true,
  //   "total": {
  //     "sc_errors": 0,
  //     "scrambled": false,
  //     "pcr_errors": 24,
  //     "bitrate_limit": 104,
  //     "pes_errors": 0,
  //     "bitrate": 1807,
  //     "cc_errors": 0,
  //     "packets": 1204
  //   }
  // }

});
