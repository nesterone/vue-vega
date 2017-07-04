<template>
  <div id="app">
     <vgl-spec>
       <vgl-mark
               :encode="values"
               :type="bar"
               :x="{ 'field' : 'a', 'type': 'ordinal'}"
               :y="{ 'field' : 'b', 'type': 'quantitative'}">
       </vgl-mark>
     </vgl-spec>
  </div>
</template>

<script>
import VglSpec from "./components/noVega/VglSpec.vue";
import VglMark from "./components/noVega/VglMark.vue";

export default {

  components: {
      VglSpec,
      "vgl-spec": VglSpec,
      "vgl-mark": VglMark
  },

  name: 'app',

  data () {
    return {
      values: [
          {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
          {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
          {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
      ]
    }
  }
}
</script>

<style>

</style>
