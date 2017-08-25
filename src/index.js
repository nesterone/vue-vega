import {VegaLiteComponent} from 'src/components/index'

export default {
  install (Vue) {
    Vue.component('vega-lite', VegaLiteComponent)
  }
}
