import vegaLiteMixin from 'src/mixin/vegaLiteMixin'
import MarkOptionMissedError from 'src/error/MarkOptionMissedError'
import EncodingOptionMissedError from 'src/error/EncodingOptionMissedError'

describe('vegaLiteMixin', () => {
  describe('beforeCreate', () => {
    it('should throw MarkOptionMissedError if option doesn\'t contain `mark` field', () => {
      const $options = {
        data () {
          return {values: [1, 2, 3]}
        },
        encoding: {}
      }
      const context = {
        $options
      }
      expect(() => { vegaLiteMixin.beforeCreate.call(context) }).to.throw(MarkOptionMissedError)
    })
    it('should throw MarkOptionMissedError if option doesn\'t contain `mark` field', () => {
      const $options = {
        data () {
          return {values: [1, 2, 3]}
        },
        mark: 'blabla'
      }
      const context = {
        $options
      }
      expect(() => { vegaLiteMixin.beforeCreate.call(context) }).to.throw(EncodingOptionMissedError)
    })
  })
})
