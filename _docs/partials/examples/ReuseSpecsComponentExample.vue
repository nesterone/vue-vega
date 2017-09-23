<template lang="pug">
  BarChart
</template>

<script>
  import VueVega from 'vue-vega'
  import BarChartSpec from 'spec/vega-lite/bar.vl.json'

  export default {
    components: {
      BarChart: VueVega.mapVegaLiteSpec(BarChartSpec)
    }
  }
</script>
