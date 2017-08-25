export default class VegaLitePlugin {
  constructor ({vueExtendProxy, vueVegaOptionHelper, VegaLiteComponent}) {
    this.vueExtendProxy = vueExtendProxy
    this.vueVegaOptionHelper = vueVegaOptionHelper
    this.VegaLiteComponent = VegaLiteComponent
  }

  install (Vue) {
    // TODO: in 'Provide explicit spec to component API instead of implicit proxy over extend #23'
    Vue.extend = this.vueExtendProxy({
      extendFn: Vue.extend,
      vueVegaOptionHelper: this.vueVegaOptionHelper
    })

    Vue.component('vega-lite', this.VegaLiteComponent)
  }
}
