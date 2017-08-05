import vueOptionSpec from 'src/util/vueOptionSpec'

describe('vueOptionSpec', () => {
  let options
  const sandbox = sinon.sandbox.create()

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

  describe('isVegaLiteCompatible', () => {
    it('should be false if options don\'t contain `mark` field', () => {
      options = Object.assign({encoding: {}}, options)
      expect(vueOptionSpec.isVegaLiteCompatible(options)).to.be.false
    })

    it('should be false if options don\'t contain `encoding` field', () => {
      options = Object.assign({mark: 'blabla'}, options)
      expect(vueOptionSpec.isVegaLiteCompatible(options)).to.be.false
    })

    it('should be false if options don\'t contain `data` field', () => {
      delete options.data
      options = Object.assign({mark: 'blabla', encoding: {}}, options)

      expect(vueOptionSpec.isVegaLiteCompatible(options)).to.be.false
    })
  })

  describe('isTemplateRequired', () => {
    beforeEach(() => {
      options = Object.assign({mark: 'blabla', encoding: {}}, options)
    })

    it('should be true if template or el doesn`t present in options', () => {
      expect(vueOptionSpec.isTemplateRequired(options)).to.be.true
    })

    it('should be false if template present in options', () => {
      options.template = 'template'

      expect(vueOptionSpec.isTemplateRequired(options)).to.be.false
    })

    it('should be false if el present in options', () => {
      options.el = 'el'

      expect(vueOptionSpec.isTemplateRequired(options)).to.be.false
    })

    it('should be false if it`s not a vega lite', () => {
      options = {template: 'template'}

      expect(vueOptionSpec.isTemplateRequired(options)).to.be.false
    })
  })
})
