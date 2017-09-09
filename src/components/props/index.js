import {
  VEGA_LITE_SCHEMA_URL
} from 'src/constants'

const vegaLiteProps = {
  $schema: {
    type: String
  },
  autoResize: {
    type: Boolean
  },
  background: {
    type: String
  },
  padding: {
    type: [Number, Object]
  },
  config: {
    type: Object
  },
  data: {
    type: [Object, Array]
  },
  description: {
    type: String
  },
  encoding: {
    type: Object
  },
  height: {
    type: Number
  },
  mark: {
    type: String
  },
  name: {
    type: String
  },
  selection: {
    type: Object
  },
  title: {
    type: [String]
  },
  transform: {
    type: Array
  },
  width: {
    type: Number
  }
}

vegaLiteProps.$schema.default = VEGA_LITE_SCHEMA_URL

export default vegaLiteProps
