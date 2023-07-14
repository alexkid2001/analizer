<template>
  <div class="chart-container">
    <div ref="chart" />
  </div>
</template>

<script setup lang="ts">
// import Dygraph from 'dygraphs';

const props = defineProps<{ newRate: number[] }>();

const chart = ref();
let chartInstance: any = null;
const data = reactive(Array.from(Array(1000), (_, idx) => [+(-10.00 + idx * 0.01).toFixed(2), null]));
let time = reactive(0);
const createChart = (Dygraph: any) => {
  chartInstance = new Dygraph(
    chart.value,
    data,
    {
      title: 'Bitrate Mbit/s',
      width: 1192,
      labels: ['', 'Bitrate'],
      rollPeriod: 5
    }
  );
};

const updateChart = (newVal: number[]) => {
  let currentIdx = 0;
  const interval = setInterval(() => {
    if (currentIdx > newVal.length) {
      clearInterval(interval);
    }
    time = +(time + 0.01).toFixed(2);
    data.push([time, newVal[currentIdx] / 6.64]);
    if (data.length > 1000) { data.shift(); }
    if (chartInstance) {
      chartInstance.updateOptions({ file: data });
    }
    currentIdx++;
  }, 10);
};

onMounted(() => {
  if (process.client) {
    import('dygraphs').then((Dygraph) => {
      createChart(Dygraph.default);
    });
  }
});

watch(
  () => props.newRate,
  () => {
    updateChart(props.newRate);
  }
);
</script>

<style lang="scss">
.dygraph-label {
  color: red;
  text-align: center;
}
.chart-container {
  width: 100%;
  div {
    max-width: 100%;
  }
}
</style>
