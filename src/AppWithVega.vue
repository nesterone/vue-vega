<template>
  <div id="app">
      <BarChart/>
  </div>
</template>

<script>
import BarChart from "./components/BarChart.vue";
import VglMark from "./components/noVega/VglMark.vue";

export default {

  components: {
      BarChart
  },

  name: 'app'
}
</script>

<style>

</style>
