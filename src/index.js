import * as vega from 'vega';
import * as vl from 'vega-lite';
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin';

const VueVegaPlugin = {
  install (Vue) {
    const vegaLiteMixin = createVegaLiteMixin({
      compile: vl.compile,
      parse: vega.parse,
      View: vega.View,
      logLevel: vega.Debug
    })

    Vue.mixin(vegaLiteMixin)
  }
}

export default VueVegaPlugin
