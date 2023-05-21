<template>
<div>
<span><strong>PAT TSID:{{data.tsid}}</strong></span>

<ul class="analyze-psi">
    <li v-for="program in data.programs" :key="program.pnr">PNR:{{program.pnr}} PID:{{program.pid}}</li>
</ul>
</div>
</template>


<script>
export default {
    props: {
        data: {
            "type": Object,
        },
    },
}
</script>
