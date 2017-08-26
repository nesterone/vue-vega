import { partial } from 'lodash-es'
import { parse, View, Warn } from 'vega'
import {createView} from 'src/components/util/vegaHelpers'
import { RENDER_TYPE, DEFAULT_DATA_SOURCE_NAME } from 'src/constants'

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
  },

  streamDataToVegaView (vegaView, nextData, prevData, vegaSpec, changeset) {
    const localPrevData = vegaView.data(DEFAULT_DATA_SOURCE_NAME)
    const changeSet = changeset().remove(localPrevData).insert(nextData)
    vegaView.change(DEFAULT_DATA_SOURCE_NAME, changeSet).run()
  }
}
