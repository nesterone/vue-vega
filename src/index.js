import { parse, View, Warn } from 'vega'
import { compile } from 'vega-lite'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin'
import vueOptionSpec from 'src/util/vueOptionSpec'

const VueVegaPlugin = {
  install (Vue) {
    const vegaLiteMixin = createVegaLiteMixin({
      compile: compile,
      parse: parse,
      View: View,
      logLevel: Warn,
      vueOptionSpec: vueOptionSpec
    })

    Vue.mixin(vegaLiteMixin)

    let originalExtend = Vue.extend
    Vue.extend = function (options) {
      if (vueOptionSpec.isVegaLite(options)) {
        if (!options.template && !options.el) {
          options.template = '<div></div>'
        }
      }

      return originalExtend.apply(this, arguments)
    }
  }
}

export default VueVegaPlugin
