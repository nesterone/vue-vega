import { parse, View, Warn, changeset } from 'vega'
import { compile } from 'vega-lite'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin'
import vueExtendProxy from 'src/util/vueExtendProxy'
import VueVegaOptionHelper from 'src/util/VueVegaOptionHelper'
import createVegaLiteComponent from 'src/components/createVegaLiteComponent'
import VegaLitePlugin from 'src/plugin/VegaLitePlugin'

let vegaLiteComponentOptions = createVegaLiteComponent({ compile })
let mixin = createVegaLiteMixin({
  changeset: changeset,
  compile: compile,
  parse: parse,
  View: View,
  logLevel: Warn
})
vegaLiteComponentOptions = Object.assign(mixin, vegaLiteComponentOptions)

const vueVegaOptionHelper = new VueVegaOptionHelper({
  vegaLiteComponentOptions: vegaLiteComponentOptions
})

const vegaLitePlugin = new VegaLitePlugin({
  mixin,
  vueExtendProxy,
  vueVegaOptionHelper,
  VegaLiteComponent: vegaLiteComponentOptions
})

export default vegaLitePlugin
