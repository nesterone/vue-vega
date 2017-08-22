import vueExtendProxy from 'src/util/vueExtendProxy'
import VueVegaOptionHelper from 'src/util/VueVegaOptionHelper'
import VegaLitePlugin from 'src/plugin/VegaLitePlugin'
import {VegaLiteComponent} from 'src/components/index'

const vueVegaOptionHelper = new VueVegaOptionHelper({
  vegaLiteComponentOptions: VegaLiteComponent
})

const vegaLitePlugin = new VegaLitePlugin({
  vueExtendProxy,
  vueVegaOptionHelper,
  VegaLiteComponent: VegaLiteComponent
})

export default vegaLitePlugin
