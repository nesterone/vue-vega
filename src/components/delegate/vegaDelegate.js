import { partial } from 'lodash-es'
import { parse, View, Warn } from 'vega'
import createView from 'src/components/util/createView'
import { RENDER_TYPE } from 'src/constants'

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
    const originalDataSetName = vegaSpec.data[0].name
    const dataChangeset = changeset().remove(prevData).insert(nextData)
    vegaView.change(originalDataSetName, dataChangeset).run()
  }
}
