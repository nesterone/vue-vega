import vegaLiteProps from './props'
import vegaLiteComputed from './computed'
import vegaLiteDelegate from './delegate/vegaLiteDelegate'
import lifecycleHooks from './lifecycleHooks'
import vegaSpecWatch from './watch/vegaSpecWatch'
import dataWatch from './watch/dataWatch'
import {
  COMPONENT_TEMPLATE,
  VEGA_LITE_COMPONENT_NAME
} from 'src/constants'

const VegaLiteComponent = {
  name: VEGA_LITE_COMPONENT_NAME,
  template: COMPONENT_TEMPLATE,
  ...lifecycleHooks,
  props: {
    ...vegaLiteProps
  },
  computed: {
    ...vegaLiteComputed
  },
  methods: {
    ...vegaLiteDelegate
  },
  watch: {
    vegaSpec: vegaSpecWatch,
    data: dataWatch
  }
}

export {
  VegaLiteComponent
}
