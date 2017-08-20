import {partial} from 'lodash-es'
import {parse, View, Warn} from 'vega'
import createView from './createView'
import {RENDER_TYPE} from 'src/components/vegaLiteConstants'

export default {
  createVegaView: partial(createView, {
    View,
    parse,
    logLevel: Warn,
    renderType: RENDER_TYPE
  }),

  mountVegaView (vegaView, element) {
    vegaView.initialize(element).run()
  },

  destroyVegaView (vegaView) {
    vegaView.finalize()
  }
}
