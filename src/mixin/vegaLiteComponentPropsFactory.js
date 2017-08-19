import { compile } from 'vega-lite'

export default {
  name: 'vega-lite',
  template: '<div></div>',
  props: {
    description: {
      type: String
    },
    mark: {
      type: String
    },
    encoding: {
      type: Object
    },
    data: [Object, Array],
    schema: {
      type: String,
      default: 'https://vega.github.io/schema/vega-lite/v2.json'
    }
  },
  computed: {
    vegaLiteSpec () {
      const spec = Object.assign({
        description: this.description,
        mark: this.mark,
        encoding: this.encoding
      }, {'$schema': this.schema})

      if (Array.isArray(this.data)) {
        spec.data = {values: this.data}
      } else {
        spec.data = this.data
      }

      return spec
    },
    vegaSpec () {
      let compileOutput = this.compileVegaLiteSpec(this.vegaLiteSpec)
      return compileOutput.spec
    }
  },
  methods: {
    compileVegaLiteSpec: compile
  }
}
