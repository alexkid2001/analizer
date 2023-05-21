<template>
<div>
<span><strong>SDT TSID:{{data.tsid}}</strong></span>

<ul v-for="service in data.services" :key="service.sid" class="analyze-psi">
    <li>PNR:{{service.sid}}</li>
    <li v-for="(desc, index) in service.descriptors" :key="index">
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
