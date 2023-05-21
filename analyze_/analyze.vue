<template>
<div>
    <analyze-status :data="analyzeData"></analyze-status>
    <hr />
    <line-chart :series="series" :options="chartOptions"></line-chart>
    <hr />
    <psi-pat v-if="patData" :data="patData"></psi-pat>
    <psi-pmt v-for="pmtData in pmtList" :key="pmtData.pnr" :data="pmtData"></psi-pmt>
    <psi-sdt v-if="sdtData" :data="sdtData"></psi-sdt>
    <psi-nit v-if="nitData" :data="nitData"></psi-nit>
</div>
</template>


<script>
import { LineChart } from "../../../node_modules/series-chart/src/lib.js";

import AnalyzeStatus from "./analyze-status.vue";
import PsiPat from "./psi-pat.vue"
import PsiPmt from "./psi-pmt.vue"
import PsiSdt from "./psi-sdt.vue"
import PsiNit from "./psi-nit.vue"


export default {
    components: {
        LineChart,
        AnalyzeStatus,
        PsiPat,
        PsiPmt,
        PsiSdt,
        PsiNit,
    },

    data() {
        return {
            analyzeData: undefined,
            patData: undefined,
            pmtList: [],
            sdtData: undefined,
            nitData: undefined,
            series: {},
            chartOptions: {}
        }
    },

    mounted() {
        this.$options.raw = [];
        this.$options.data = [];

        this.chartOptions = {
            y: {
                mutable: true,
                mutableToMin: true,
                // Number horizontal grid lines
                numGridLines: 3,
                min: 0,
                max: 10,
            },

            padding: {
                top: 5,
                left: 50,
                right: 5,
                bottom: 30
            },

            reportToDraw: 2,

            labels: {
                x: { display: false },
                y: { display: false }
            }
        }

        for(var i = -1000; i < 0; i += 1) {
            this.$options.raw.push({ x: i, y: 0 });
            this.$options.data.push({ x: i, y: 0 });
        }
    },

    methods: {
        setData(data) {
            if(data.rate) {
                const x = this.$options.data[this.$options.data.length - 1].x;
                const rollPeriod = 10;

                this.$options.raw = this.$options.raw.slice(data.rate.length);
                this.$options.data = this.$options.data.slice(data.rate.length);

                for(let i = 0; i < data.rate.length; i++) {
                    this.$options.raw.push({
                        x: x + i + 1,
                        y: Math.round((data.rate[i] * 188 * 8) / 10),
                    });
                }

                if(x >= rollPeriod) {
                    let i = this.$options.data.length;
                    const m = i + data.rate.length;
                    for(; i < m; i++) {
                        let sum = 0;
                        for(let j = i - rollPeriod + 1; j < i + 1; j++) {
                            sum += this.$options.raw[j].y;
                        }
                        this.addSerie(this.$options.raw[i].x, sum / rollPeriod);
                    }
                } else {
                    const sum = data.rate.reduce((a, b) => a + b, 0) / data.rate.length;
                    for(let i = 0; i < data.rate.length; i++) {
                        this.addSerie(x + i + 1, sum);
                    }
                }
            } else if(data.analyze) {
                this.analyzeData = data.total;
            } else if(data.psi) {
                switch(data.psi) {
                    case "pat":
                        this.patData = data;
                        this.pmtList = [];
                        break;
                    case "pmt":
                        this.pmtList.push(data);
                        break;
                    case "sdt":
                        this.sdtData = data;
                        break;
                    case "nit":
                        this.nitData = data;
                        break;
                }
            }
        },

        addSerie(time, data) {
            this.$options.data.push({
                x: time,
                y: data,
            });

            this.series = { time, data: [data]};
        }
    },
}
</script>


<style lang="less">
.analyze-psi {
    padding-left: 1rem;
}
.ct-chart {
    .ct-series-a .ct-line {
        stroke: var(--info-color);
        stroke-width: 1px;
    }

    .ct-grids line {
       color: var(--border-color);
    }
}
</style>
