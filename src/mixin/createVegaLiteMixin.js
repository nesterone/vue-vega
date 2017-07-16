import MarkOptionMissedError from 'src/error/MarkOptionMissedError'
import EncodingOptionMissedError from 'src/error/EncodingOptionMissedError'

const SPEC_TEMPLATE = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v2.json'
};

export default function createVegaLiteMixin (options) {
  return {

    template: `<div></div>`,

    props: {
      description: {
        type: String
      }
    },

    beforeCreate () {
      this.$spec = Object.assign({}, SPEC_TEMPLATE);

      this.$spec.data = this.$options.data();

      const mark = this.$options.mark

      if (!mark) {
        throw new MarkOptionMissedError()
      }

      this.$spec.mark = mark;

      const encoding = this.$options.encoding

      if (!encoding) {
        throw new EncodingOptionMissedError()
      }

      this.$spec.encoding = encoding;
    },

    created () {
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

      this.$vg.logLevel(logLevel)
        .renderer('svg')
        .hover();
    },

    mounted () {
      this.$vg
        .initialize(this.$el)
        .run();
    },

    destroyed () {
      this.$vg.finalize();
    }
  }
}
