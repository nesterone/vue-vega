<template lang="pug">
  div
    Interactive(@signal:pointer_tuple="onPointer")
    div
      span {{field}} : {{value}}
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
        field: '',
        value: ''
      }
    },
    methods: {
      onPointer (tuple) {
        if (tuple && tuple.fields) {
          this.field = tuple.fields[1]
          this.value = tuple.values[1]
        }
      }
    }
  }
</script>
