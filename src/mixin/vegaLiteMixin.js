/* eslint no-proto: 0 */
import * as vega from 'vega';
import * as vl from 'vega-lite';
import MarkOptionMissedError from 'src/error/MarkOptionMissedError'

const specTemplate = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v2.json'
};

export default {

  template: `<div></div>`,

  props: {
    description: {
      type: String
    }
  },

  beforeCreate () {
    this.$spec = Object.assign({}, specTemplate);

    this.$spec.data = this.$options.data();

    const mark = this.$options.mark;

    if (!mark) {
      throw new MarkOptionMissedError()
    }

    this.$spec.mark = mark;

    const encoding = this.$options.encoding;

    if (!encoding) {
      throw new Error('Can\'t build visualization data encoding')
    }

    this.$spec.encoding = encoding;
  },

  created () {
    if (this.description) {
      this.$spec.description = this.description;
    }

    const vegaSpec = vl.compile(this.$spec).spec;
    const runtime = vega.parse(vegaSpec);

    this.$vg = new vega.View(runtime)
      .logLevel(vega.Debug)
      .renderer('svg')
      .hover()
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
