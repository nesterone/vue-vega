<script>
import * as vega from 'vega';
import * as vl from 'vega-lite';
import createVegaLiteMixin from '../mixin/createvegaLiteMixin';

const vegaLiteMixin = createVegaLiteMixin({
  compile: vl.compile,
  parse: vega.parse,
  View: vega.View,
  logLevel: vega.Debug
})

export default {

  mixins: [vegaLiteMixin],

  data () {
    return {
      values: [
        {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
        {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
        {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
      ]
    }
  },

  mark: 'bar',

  encoding: {
    x: {field: 'a', type: 'ordinal'},
    y: {field: 'b', type: 'quantitative'}
  }
}
</script>

