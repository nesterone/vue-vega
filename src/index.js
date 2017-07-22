import { parse, View, Warn } from 'vega'
import { compile } from 'vega-lite'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin'
import vueExtendProxy from 'src/util/vueExtendProxy'
import vueOptionSpec from 'src/util/vueOptionSpec'
import VegaLitePlugin from 'src/plugin/VegaLitePlugin'

const mixin = createVegaLiteMixin({
  compile: compile,
  parse: parse,
  View: View,
  logLevel: Warn,
  vueOptionSpec: vueOptionSpec
})

const vegaLitePlugin = new VegaLitePlugin({
  mixin,
  vueExtendProxy,
  vueOptionSpec
})

export default vegaLitePlugin
