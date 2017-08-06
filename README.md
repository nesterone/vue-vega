# vue-vega

Visualization Grammar for Vue.js 

## Features & characteristics:

* Vega-lite support from 2.0.0
* Dependencies on vega and vega-lite
* Vue components as vega specs
* `vega-lite` component to use in template
* +99% test coverage

## Install & basic usage

```bash
  npm install vue-vega
```

```vue
<template>
  <vega-lite
    :data="values"
    :mark="bar"
    :encoding="{
        x: {field: 'a', type: 'ordinal'},
        y: {field: 'b', type: 'quantitative'}
    }"
  />
</template>

<script>
  export default{
    data () {
      return {
        values: [
          {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
          {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
          {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
        ]
      }
    }
  }
</script>

```
## JSFiddle

Example JSFiddle


## Contributing

```bash
# serve with hot reload at localhost:8080
npm run dev

# distribution build with minification
npm run build:bundle

# build the _docs into docs
npm run build:docs

# build all
npm run build

# run unit tests
npm run test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
