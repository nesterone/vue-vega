# vue-vega

Vega Lite and Vega integration in Vue.js ecosystem

## UNDER CONSTRUCTION

It's still in development, API isn't stable, only after removing `alpha` prefix from the version that project would have stable API

## Features & characteristics:

* Vega-lite support from 2.0.0 (not all props yet)
* `vega-lite` component
*  ~~map vega lite specs to vue components~~
* +99% test coverage

## Install & basic usage

```bash
  npm install vue-vega
```

```vue
<template>
  <vega-lite
     :data="[
         {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
         {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
         {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
     ]"
     mark="bar"
     :encoding="{
       x: {field: 'a', type: 'ordinal'},
       y: {field: 'b', type: 'quantitative'}
     }">
   </vega-lite>
</template>
```
## JSFiddle

* [Basic Usage](https://jsfiddle.net/NesterOne/syvk7e04)

## Contributing

Check out crafted [Contributing Guide](CONTRIBUTING.md),

## Build

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
 
