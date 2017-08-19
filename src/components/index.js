import vegaLiteProps from './vegaLiteProps'
import vegaLiteComputed from './vegaLiteComputed'

const DEFAULT_TEMPLATE = '<div></div>'
const DEFAULT_VEGA_LITE_COMPONENT_NAME = 'vega-lite'

const VegaLiteComponent = {
  name: DEFAULT_VEGA_LITE_COMPONENT_NAME,
  template: DEFAULT_TEMPLATE,
  props: {
    ...vegaLiteProps
  },
  computed: {
    ...vegaLiteComputed
  }
}

export {
  VegaLiteComponent
}
