<template lang="pug">
  div
    multiselect(
      v-model="mark",
      :options="availableMarks",
      :searchable="false",
      :close-on-select="true",
      :show-labels="false",
      placeholder="Pick a mark"
    )
    vega-lite(
      :data="data",
      :mark="mark",
      :encoding="encoding"
    )
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Multiselect
    },
    data () {
      return {
        data: [
          {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
          {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
          {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
        ],
        encoding: {
          x: {field: 'a', type: 'ordinal'},
          y: {field: 'b', type: 'quantitative'}
        },
        mark: 'bar',
        availableMarks: ['bar', 'point', 'circle', 'line']
      }
    }
  }
</script>
