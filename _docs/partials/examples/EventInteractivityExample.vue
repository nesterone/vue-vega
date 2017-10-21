<template lang="pug">
  div
    Interactive(@click="displaySelection")
    div
      span Origin : {{origin}}
    div
      span Cylinders : {{cylinders}}
    div
      span Records : {{records}}
</template>

<script>
  import VueVega from 'vue-vega'
  import Interactive from 'spec/vega-lite/interactive.vl.json'

  export default {
    components: {
      Interactive: VueVega.mapVegaLiteSpec(Interactive)
    },
    data () {
      return {
        origin: 'N/A',
        cylinders: 0,
        records: 0
      }
    },
    methods: {
      displaySelection (event, item) {
        if (item && item.datum) {
          let datum = item.datum

          this.origin = datum.Origin
          this.cylinders = datum.Cylinders
          this.records = datum['count_*']
        }
      }
    }
  }
</script>
