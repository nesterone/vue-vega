export default class VegaLitePlugin {
  constructor ({mixin, vueExtendProxy}) {
    this.mixin = mixin
    this.vueExtendProxy = vueExtendProxy
  }

  install (Vue) {
    Vue.mixin(this.mixin)

    Vue.extend = this.vueExtendProxy(Vue.extend)
  }
}
