import vegaLiteSchema from 'schema/vega-lite-schema.json'
import mapSchemaToProps from './mapSchemaToProps'
import {
  VEGA_LITE_SCHEMA_URL
} from 'src/constants'

const vegaLiteProps = mapSchemaToProps(vegaLiteSchema)

vegaLiteProps.$schema.default = VEGA_LITE_SCHEMA_URL

export default vegaLiteProps
