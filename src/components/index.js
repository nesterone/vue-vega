import vegaLiteProps from './vegaLiteProps'
import vegaLiteComputed from './vegaLiteComputed'
import vegaLiteCompilerDelegate from './vegaLiteCompilerDelegate'
import {
  COMPONENT_TEMPLATE,
  VEGA_LITE_COMPONENT_NAME
} from './vegaLiteConstants'

const VegaLiteComponent = {
  name: VEGA_LITE_COMPONENT_NAME,
  template: COMPONENT_TEMPLATE,
  props: {
    ...vegaLiteProps
  },
  computed: {
    ...vegaLiteComputed
  },
  methods: {
    ...vegaLiteCompilerDelegate
  }
}

export {
  VegaLiteComponent
}
