<template lang="pug">
  BarChart
</template>

<script>
  import VueVega from 'vue-vega'
  import BarChartSpec from 'spec/vega-lite/bar.vl.json'

  const component = VueVega.mapVegaLiteSpec(BarChartSpec);
  console.log(component)

  export default {
    components: {
      BarChart: VueVega.mapVegaLiteSpec(BarChartSpec)
    }
  }
</script>
