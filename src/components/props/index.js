import {VEGA_LITE_SCHEMA_URL} from 'src/constants'

export default {
  spec: {
    type: Object
  },
  $schema: {
    type: String,
    default: VEGA_LITE_SCHEMA_URL
  },
  autosize: {
    type: [String, Object]
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
  },
  layer: {
    type: Array
  },
  resolve: {
    type: Object
  }
}

