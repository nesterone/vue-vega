export default class VegaLitePlugin {
  constructor ({vueExtendProxy, vueVegaOptionHelper, VegaLiteComponent}) {
    this.vueExtendProxy = vueExtendProxy
    this.vueVegaOptionHelper = vueVegaOptionHelper
    this.VegaLiteComponent = VegaLiteComponent
  }

  install (Vue) {
    Vue.extend = this.vueExtendProxy({
      extendFn: Vue.extend,
      vueVegaOptionHelper: this.vueVegaOptionHelper
    })

    Vue.component('vega-lite', this.VegaLiteComponent)
  }
}
