import {VegaLiteComponent} from 'src/components/index'
import {
  mapVegaLiteSpec,
  mapVegaSpecToComponentOptions
} from 'src/util/vueVegaUtils'

export default {
  install (Vue) {
    Vue.component('vega-lite', VegaLiteComponent)
  },
  VegaLiteComponent,
  mapVegaLiteSpec,
  mapVegaSpecToComponentOptions
}
