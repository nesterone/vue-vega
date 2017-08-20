import { parse, View, Warn, changeset } from 'vega'
import { compile } from 'vega-lite'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin'
import vueExtendProxy from 'src/util/vueExtendProxy'
import VueVegaOptionHelper from 'src/util/VueVegaOptionHelper'
import VegaLitePlugin from 'src/plugin/VegaLitePlugin'
import {VegaLiteComponent} from 'src/components/index'

let vegaLiteComponentOptions = VegaLiteComponent
let mixin = createVegaLiteMixin({
  changeset: changeset,
  compile: compile,
  parse: parse,
  View: View,
  logLevel: Warn
})

vegaLiteComponentOptions = Object.assign({}, vegaLiteComponentOptions, mixin)

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
