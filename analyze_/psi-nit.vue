<template>
<div>
<span><strong>NIT ID:{{data.network_id}}</strong></span>

<ul v-if="data.descriptors" class="analyze-psi">
    <li v-for="(desc, index) in data.descriptors" :key="index">
        <psi-desc v-once :data="desc"></psi-desc>
    </li>
</ul>

<ul v-for="stream in data.streams" :key="stream.tsid" class="analyze-psi">
    <li>NIT TSID:{{stream.tsid}} ONID:{{stream.onid}}</li>
    <li v-for="(desc, index) in data.descriptors" :key="index">
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
}
</script>
