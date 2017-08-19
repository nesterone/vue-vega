const DEFAULT_VEGA_LITE_SPEC_TEMPLATE = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v2.json'
}

export default function createVegaLiteComponent ({compile}) {
  return {
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
      data: [Object, Array]
    },
    computed: {
      vegaLiteSpec () {
        const spec = Object.assign({
          description: this.description,
          mark: this.mark,
          encoding: this.encoding
        }, DEFAULT_VEGA_LITE_SPEC_TEMPLATE)

        if (Array.isArray(this.data)) {
          spec.data = {values: this.data}
        } else {
          spec.data = this.data
        }

        return spec
      },
      vegaSpec () {
        let compileOutput = compile(this.vegaLiteSpec)
        return compileOutput.spec
      }
    }
  }
}
