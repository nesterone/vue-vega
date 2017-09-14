<template lang="pug">
  BarChart(
    :data="{url: 'data/population'}"
  )
</template>

<script>
  import VueVega from 'vue-vega'
  import BarChartSpec from 'spec/vega-lite/bar_aggregate_empty.json'

  export default {
    components: {
      BarChart: VueVega.mapVegaLiteSpec(BarChartSpec)
    }
  }
</script>
