import {partial} from 'lodash-es'
import {parse, View, Warn} from 'vega'
import createVegaView from './createVegaView'

export default {
  createVegaView: partial(createVegaView, {
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
