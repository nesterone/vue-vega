export default class VegaLitePlugin {
  constructor ({mixin, vueExtendProxy, vueVegaOptionHelper, VegaLiteComponent}) {
    this.mixin = mixin
    this.vueExtendProxy = vueExtendProxy
    this.vueVegaOptionHelper = vueVegaOptionHelper
    this.VegaLiteComponent = VegaLiteComponent
  }

  install (Vue) {
    Vue.mixin(this.mixin)

    Vue.extend = this.vueExtendProxy({
      extendFn: Vue.extend,
      vueVegaOptionHelper: this.vueVegaOptionHelper
    })

    Vue.component('vega-lite', this.VegaLiteComponent)
  }
}
