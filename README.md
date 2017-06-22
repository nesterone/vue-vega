# vue-gl-lite
Vega Lite Gramma extension

Origianl Vega gramma file

```
{
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "description": "A simple bar chart with embedded data.",
  "data": {
    "values": [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
}
```

We can define in Vue component style 

```
<template lang="vgm-lite">
  <vg-document :description="description">
    <vg-bar v-encode="value in values" :x="v.a" :y="v.b"/>
  </vg-document>
</template>

<script>
export default { 
  props: {
    descritption: {
      type: String,
      default: "A simple bar chart with embedded data."
    }
  }
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
}
</script>

<style lang="vgs-lite" scoped>
  vg-bar {
    filled: true,
    color: #4682b4,
    stroke: #f3404 
  }
</style>


```
