# vue-vega

> Vega Visualization Gramma extention for Vue

Vega Lite Gramma extension

Original Vega gramma file

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
  <vg-spec :description="description">
    <vg-bar v-encode="value in values" :x="v.a" :y="v.b"/>
  </vg-spec>
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


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
