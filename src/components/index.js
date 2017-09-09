import vegaLiteComputed from './props/vegaLiteComputed'
import vegaLiteDelegate from './delegate/vegaLiteDelegate'
import lifecycleHooks from './lifecycleHooks'
import vegaSpecWatch from './watch/vegaSpecWatch'
import dataWatch from './watch/dataWatch'
import mapSchemaToProps from './props/mapSchemaToProps'
import vegaLiteSchema from 'schema/vega-lite-schema.json'
import {
  COMPONENT_TEMPLATE,
  VEGA_LITE_COMPONENT_NAME,
  VEGA_LITE_SCHEMA_URL
} from 'src/constants'

const vegaLiteProps = mapSchemaToProps(vegaLiteSchema)

vegaLiteProps.$schema.default = VEGA_LITE_SCHEMA_URL

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
