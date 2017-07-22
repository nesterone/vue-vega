import isVegaLiteOptions from 'src/util/isVegaLiteOptions'

const SPEC_TEMPLATE = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v2.json'
};

export default (options) => {
  return {

    props: {
      description: {
        type: String
      }
    },

    beforeCreate () {
      if (!isVegaLiteOptions(this.$options)) {
        return
      }

      this.$spec = Object.assign({}, SPEC_TEMPLATE)
      this.$spec.data = this.$options.data()
      this.$spec.mark = this.$options.mark
      this.$spec.encoding = this.$options.encoding
    },

    created () {
      if (!this.$spec) {
        return
      }

      const compile = options.compile
      const parse = options.parse
      const View = options.View
      const logLevel = options.logLevel

      if (this.description) {
        this.$spec.description = this.description;
      }

      const vegaSpec = compile(this.$spec).spec;
      const runtime = parse(vegaSpec);

      this.$vg = new View(runtime)
        .logLevel(logLevel)
        .renderer('svg')
        .hover();
    },

    mounted () {
      if (!this.$vg) {
        return
      }

      this.$vg
        .initialize(this.$el)
        .run();
    },

    beforeDestroy () {
      if (!this.$vg) {
        return
      }

      this.$vg.finalize();
    }
  }
}
