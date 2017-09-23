<template lang="pug">
  BarDualAxis
</template>

<script>
  import VueVega from 'vue-vega'
  import BarDualAxis from 'spec/vega-lite/layer_bar_dual_axis.vl.json'

  export default {
    components: {
      BarDualAxis: VueVega.mapVegaLiteSpec(BarDualAxis)
    }
  }
</script>
