import vegaLiteProps from './props/vegaLiteProps'
import vegaLiteComputed from './props/vegaLiteComputed'
import vegaLiteCompilerDelegate from './delegate/vegaLiteCompilerDelegate'
import vegaViewDelegate from './delegate/vegaViewDelegate'
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
    ...vegaLiteCompilerDelegate,
    ...vegaViewDelegate
  },
  watch: {
    vegaSpec: vegaSpecWatch,
    data: dataWatch
  }
}

export {
  VegaLiteComponent
}
