import vueOptionSpec from 'src/util/vueOptionSpec'

const sandbox = sinon.sandbox.create()

describe('vueOptionSpec', () => {
  let options

  beforeEach(() => {
    options = {
      data () {
        return {values: [1, 2, 3]}
      }
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('isVegaLite', () => {
    it('should be false if options don\'t contain `mark` field', () => {
      options = Object.assign({encoding: {}}, options)
      expect(vueOptionSpec.isVegaLite(options)).to.be.false
    })

    it('should be false if options don\'t contain `encoding` field', () => {
      options = Object.assign({mark: 'blabla'}, options)
      expect(vueOptionSpec.isVegaLite(options)).to.be.false
    })

    it('should be false if options don\'t contain `data` field', () => {
      delete options.data
      options = Object.assign({mark: 'blabla', encoding: {}}, options)

      expect(vueOptionSpec.isVegaLite(options)).to.be.false
    })
  })
})
