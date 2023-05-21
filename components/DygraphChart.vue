<template>
  <div>
    <div ref="chart"></div>
  </div>
</template>

<script setup lang="ts">
  // import Dygraph from 'dygraphs';

  const chart = ref()
  let chartInstance = null;
  const createChart = (Dygraph: any) => {
    chartInstance = new Dygraph(chart.value, [
      [-10, null],
      [-9, null],
      [-8, null],
      [-7, null],
      [-6, null],
      [-5, null],
      [-4, null],
      [-3, null],
      [-2, null],
      [-1, null],
      [0, null]
    ], {
      title: 'Bitrate Mbit/s'
    })
  }

  const updateChart = () => {

  }

  onMounted(() => {
    if (process.client) {
      import('dygraphs').then((Dygraph) => {
        createChart(Dygraph.default);
        // updateChartData();
      });
    }
  })
</script>