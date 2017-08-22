import vegaLiteProps from './vegaLiteProps'
import vegaLiteComputed from './vegaLiteComputed'
import vegaLiteCompilerDelegate from './vegaLiteCompilerDelegate'
import vegaViewDelegate from './vegaViewDelegate'
import lifecycleHooks from './lifecycleHooks'
import vegaSpecWatch from './vegaSpecWatch'
import dataWatch from './dataWatch'
import {
  COMPONENT_TEMPLATE,
  VEGA_LITE_COMPONENT_NAME
} from './vegaLiteConstants'

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
