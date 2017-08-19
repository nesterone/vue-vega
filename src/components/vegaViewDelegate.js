import {partial} from 'lodash-es'
import {parse, View, Warn} from 'vega'
import createView from './createView'

export default {
  createVegaView: partial(createView, {
    View,
    parse,
    logLevel: Warn
  }),

  mountVegaView (vegaView, element) {
    vegaView.initialize(element).run()
  },

  destroyVegaView (vegaView) {
    vegaView.finalize()
  }
}
