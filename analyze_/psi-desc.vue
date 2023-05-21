<template>
<div v-html="descInfo"></div>
</template>


<script>
const hex = (n) => "0x" + ("0000" + n.toString(16)).slice(-4);


const descToString = (desc) => {
    let text = "";

    switch(desc.type_id) {
        case 9:
            return `CAS CaID:${hex(desc.caid)} PID:${desc.pid}`;
        case 10:
            return `Language: ${desc.lang}`;
        case 64:
            return `Name: ${desc.network_name}`;
        case 67:
            return `DVB-S Position: ${desc.orbital_position} Modulation: ${desc.modulation} Tp: ${desc.frequency}:${desc.polarization}:${desc.symbolrate}`;
        case 68:
            return `DVB-C Modulation: ${desc.modulation} Frequency: ${desc.frequency} Symbolrate: ${desc.symbolrate}`;
        case 72:
            return `Provider: ${desc.service_provider}<br/>Service: ${desc.service_name}`;
        case 77:
            return `Language: ${desc.lang} Title: ${desc.event_name}`;
        case 82:
            return `Stream ID: ${desc.stream_id}`;
        case 83:
            return `CaID: ${hex(desc.caid)}`;
        case 84:
            let l1l = ["Movie/Drama", "News", "Show", "Sports", "Children's", "Music", "Arts/Culture", "Social/Economics", "Education/Science", "Hobbies"]
            for (let key in desc.items) {
                if (desc.network_name.hasOwnProperty(key)) {
                    let li = l1l[desc.items[key].cn_l1]
                    text += `Content: ${li}<br/>`;
                }
            }
            return text;
        case 86:
            return `Teletext Language: ${desc.lang}`;
        case 89:
            return `Subtitling Language: ${desc.lang}`;
        case 90:
            let h = desc.hierarchy || "";
            let t = desc.transmission || "";
            return `DVB-T Modulation: ${desc.modulation} Frequency: ${desc.frequency} Bandwidth: ${desc.bandwidth}${h} Guard: ${desc.guard_interval}${t}`;
        case 91:
            for (let key in desc.network_name) {
                if (desc.network_name.hasOwnProperty(key))
                    text += `Name.${key}:${desc.network_name[key]}<br/>`;
            }
            return text;
        case 131:
            for (let key in desc.lcn) {
                if (desc.lcn.hasOwnProperty(key))
                    text += `Lcn: ${desc.lcn[key].lcn} Pnr: ${desc.lcn[key].pnr}<br/>`;
            }
            return text;
        default:
            if(desc.type_name == "unknown")
                return `Descriptor: ${desc.data}`;
            else
                return `ERR. TypeID:${desc.type_id}`;
    }
};


export default {
    props: {
        data: {
            "type": Object,
        },
    },

    computed: {
        descInfo() {
            return descToString(this.data);
        },
    }
}
</script>
