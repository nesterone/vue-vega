<template lang="pug">
  CarTrellis
</template>

<script>
  import VueVega from 'vue-vega'
  import CarTrellis from 'spec/vega-lite/trellis_bar_histogram.vl.json'

  export default {
    components: {
      CarTrellis: VueVega.mapVegaLiteSpec(CarTrellis)
    }
  }
</script>
