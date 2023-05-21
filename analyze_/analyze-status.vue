<template>
<div class="analyze-status">
    <div class="ok">{{data.bitrate}}Kbit/s</div>
    <div :class="[(!data.cc_errors) ? 'ok' : 'er']">CC:{{data.cc_errors}}</div>
    <div :class="[(!data.pes_errors) ? 'ok' : 'er']">PES:{{data.pes_errors}}</div>
    <div v-if="data.scrambled">&#x1F512;</div>
</div>
</template>


<script>
export default {
    props: {
        data: {
            "type": Object,
            "default": () => {
                return {
                    bitrate: 0,
                    cc_errors: 0,
                    pes_errors: 0,
                    scrambled: false,
                }
            },
        },
    },
}
</script>


<style lang="less" scoped>
.analyze-status {
    display: flex;
    align-items: center;

    &>* {
        margin-right: .5rem;
    }

    .ok {
        color: var(--success-bright-color);
    }

    .er {
        color: var(--error-bright-color);
    }
}
</style>
