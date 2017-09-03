import {VegaLiteComponent} from 'src/components/index'
import {
  mapVegaLiteSpecToComponentOptions,
  mapVegaSpecToComponentOptions
} from 'src/util/vueVegaUtils'

export default {
  install (Vue) {
    Vue.component('vega-lite', VegaLiteComponent)
  },
  VegaLiteComponent,
  mapVegaLiteSpecToComponentOptions,
  mapVegaSpecToComponentOptions
}
