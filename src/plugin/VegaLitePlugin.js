export default class VegaLitePlugin {
  constructor ({mixin, vueExtendProxy, vueOptionSpec}) {
    this.mixin = mixin
    this.vueExtendProxy = vueExtendProxy
    this.vueOptionSpec = vueOptionSpec
  }

  install (Vue) {
    Vue.mixin(this.mixin)

    Vue.extend = this.vueExtendProxy({
      extendFn: Vue.extend,
      vueOptionSpec: this.vueOptionSpec
    })
  }
}
