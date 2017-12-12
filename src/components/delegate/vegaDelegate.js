import {partial} from 'lodash-es'
import {parse, View, Warn} from 'vega'
import {createView} from 'src/components/util/vegaHelpers'
import {DEFAULT_DATA_SOURCE_NAME, EVENTS_TO_DELEGATE, RENDER_TYPE, SIGNAL_EVENT_PREFIX} from 'src/constants'

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

  addSignalEmitter (vegaView, spec, component) {
    const {signals} = spec
    if (signals && signals.length > 0) {
      signals.forEach(signal => {
        vegaView.addSignalListener(signal.name, (name, value) => {
          const eventName = `${SIGNAL_EVENT_PREFIX}:${name}`
          component.$emit(eventName, value)
        })
      })
    }
  },

  addEventEmitter (vegaView, component) {
    const eventEmitter = (eventName, event, item) => {
      component.$emit(eventName, event, item)
    }

    const componentEventNames = Object.keys(component.$listeners)
    const nativeLikeComponentEventNames = componentEventNames.filter((name) => {
      return EVENTS_TO_DELEGATE.indexOf(name) !== -1
    })

    nativeLikeComponentEventNames.forEach((eventName) => {
      vegaView.addEventListener(eventName, partial(eventEmitter, eventName))
    })
  },

  destroyVegaView (vegaView) {
    vegaView.finalize()
  },

  streamDataToVegaView (vegaView, nextData, prevData, vegaSpec, changeset) {
    if (!nextData && !prevData) {
      return
    }
    const localPrevData = vegaView.data(DEFAULT_DATA_SOURCE_NAME)
    let nextValues = nextData

    if (nextData && !Array.isArray(nextData) && nextData.values) {
      nextValues = nextData.values
    }

    const changeSet = changeset().remove(localPrevData).insert(nextValues)
    vegaView.change(DEFAULT_DATA_SOURCE_NAME, changeSet).run()
  }
}
