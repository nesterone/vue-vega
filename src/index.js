import { parse, View, Warn, changeset } from 'vega'
import { compile } from 'vega-lite'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin'
import vueExtendProxy from 'src/util/vueExtendProxy'
import VueVegaOptionHelper from 'src/util/VueVegaOptionHelper'
import VegaLiteComponent from 'src/component/VegaLiteComponent'
import VegaLitePlugin from 'src/plugin/VegaLitePlugin'

const vueVegaOptionHelper = new VueVegaOptionHelper()

const mixin = createVegaLiteMixin({
  changeset: changeset,
  compile: compile,
  parse: parse,
  View: View,
  logLevel: Warn,
  vueVegaOptionHelper: vueVegaOptionHelper
})

const vegaLitePlugin = new VegaLitePlugin({
  mixin,
  vueExtendProxy,
  vueVegaOptionHelper,
  VegaLiteComponent
})

export default vegaLitePlugin
