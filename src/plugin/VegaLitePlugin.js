export default class VegaLitePlugin {
  constructor ({mixin, vueExtendProxy, vueOptionSpec, VegaLiteComponent}) {
    this.mixin = mixin
    this.vueExtendProxy = vueExtendProxy
    this.vueOptionSpec = vueOptionSpec
    this.VegaLiteComponent = VegaLiteComponent
  }

  install (Vue) {
    Vue.mixin(this.mixin)

    Vue.extend = this.vueExtendProxy({
      extendFn: Vue.extend,
      vueOptionSpec: this.vueOptionSpec
    })

    Vue.component('vega-lite', this.VegaLiteComponent)
  }
}
