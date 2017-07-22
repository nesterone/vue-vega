import { parse, View, Warn } from 'vega'
import { compile } from 'vega-lite'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin'
import isVegaOptions from 'src/util/isVegaLiteOptions'

const VueVegaPlugin = {
  install (Vue) {
    const vegaLiteMixin = createVegaLiteMixin({
      compile: compile,
      parse: parse,
      View: View,
      logLevel: Warn
    })

    Vue.mixin(vegaLiteMixin)

    let originalExtend = Vue.extend
    Vue.extend = function (options) {
      if (isVegaOptions(options)) {
        if (!options.template && !options.el) {
          options.template = '<div></div>'
        }
      }

      return originalExtend.apply(this, arguments)
    }
  }
}

export default VueVegaPlugin
