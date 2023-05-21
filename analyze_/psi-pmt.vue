<template>
<div>
<span><strong>PMT PNR:{{data.pnr}}</strong></span>

<ul class="analyze-psi">
    <li>PCR PID:{{data.pcr}}</li>
    <li v-for="(desc, index) in data.descriptors" :key="index">
        <psi-desc v-once :data="desc"></psi-desc>
    </li>
</ul>

<ul v-for="stream in data.streams" :key="stream.pid" class="analyze-psi">
    <li>{{stream.type_name}} PID:{{stream.pid}} TYPE:{{typeToString(stream.type_id)}}</li>
    <li v-for="(desc, index) in stream.descriptors" :key="index">
        <psi-desc v-once :data="desc"></psi-desc>
    </li>
</ul>
</div>
</template>


<script>
import PsiDesc from "./psi-desc.vue"


export default {
    components: {
        PsiDesc,
    },

    props: {
        data: {
            "type": Object,
        },
    },

    methods: {
        typeToString: function(type_id) {
            let result = "0x" + ("00" + type_id.toString(16).toUpperCase()).slice(-2) + " ";
            switch(type_id) {
                // Video
                case 0x01:
                    result += "ISO/IEC 11172 Video";
                    break;
                case 0x02:
                    result += "ISO/IEC 13818-2 Video";
                    break;
                case 0x10:
                    result += "ISO/IEC 14496-2 Visual";
                    break;
                case 0x1B:
                    result += "ISO/IEC 14496-10 Video | H.264";
                    break;
                case 0x24:
                    result += "ISO/IEC 23008-2 Video | H.265"
                    break;
                // Audio
                case 0x03:
                    result += "ISO/IEC 11172 Audio";
                    break;
                case 0x04:
                    result += "ISO/IEC 13818-3 Audio";
                    break;
                case 0x0F:
                    result += "ISO/IEC 13818-7 Audio (ADTS)";
                    break;
                case 0x11:
                    result += "ISO/IEC 14496-3 Audio (LATM)";
                    break;
                case 0x81:
                    result += "Dolby Digital (AC-3)"
                    break;
                case 0x87:
                    result += "Dolby Digital Plus (enhanced AC-3)";
                    break;
                // Data
                case 0x06:
                    result += "ISO/IEC 13818-1 PES private data";
                    break;
                default:
                    result += "Unknown Stream Type";
                    break;
            }
            return result;
        },
    },
}
</script>
