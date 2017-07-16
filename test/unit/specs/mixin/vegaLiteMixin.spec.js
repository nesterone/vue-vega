import vegaLiteMixin from 'src/mixin/vegaLiteMixin';
import MarkOptionMissedError from 'src/error/MarkOptionMissedError';
import EncodingOptionMissedError from 'src/error/EncodingOptionMissedError';

describe('vegaLiteMixin', () => {
  describe('beforeCreate', () => {
    let $options
    let context

    beforeEach(() => {
      $options = {
        data () {
          return {values: [1, 2, 3]}
        }
      }
    })

    it('should throw MarkOptionMissedError if option doesn\'t contain `mark` field', () => {
      context = {
        $options: Object.assign({encoding: {}}, $options)
      }

      expect(() => {
        vegaLiteMixin.beforeCreate.call(context)
      }).to.throw(MarkOptionMissedError)
    })

    it('should throw MarkOptionMissedError if option doesn\'t contain `encoding` field', () => {
      context = {
        $options: Object.assign({mark: 'blabla'}, $options)
      }

      expect(() => {
        vegaLiteMixin.beforeCreate.call(context)
      }).to.throw(EncodingOptionMissedError)
    })

    it('should create vega spec object from options', () => {
      context = {
        $options: Object.assign({encoding: {}, mark: 'blabla'}, $options)
      }

      vegaLiteMixin.beforeCreate.call(context)

      expect(context.$spec).to.deep.equal({
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          values: [1, 2, 3]
        },
        mark: 'blabla',
        encoding: {}
      })
    })
  })
  describe('created', () => {
    it('should add description to spec', () => {
      const context = {
        description: 'description',
        $spec: {
          data: {
            values: [
              {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
              {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
              {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
            ]
          },
          mark: 'bar',
          encoding: {
            x: {field: 'a', type: 'ordinal'},
            y: {field: 'b', type: 'quantitative'}
          }
        }
      }

      vegaLiteMixin.created.call(context);

      expect(context.$spec.description).to.equal(context.description)
    })
  })
})
