import vegaLiteMixin from 'src/mixin/vegaLiteMixin'
import MarkOptionMissedError from 'src/error/MarkOptionMissedError'
import EncodingOptionMissedError from 'src/error/EncodingOptionMissedError'

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
})
