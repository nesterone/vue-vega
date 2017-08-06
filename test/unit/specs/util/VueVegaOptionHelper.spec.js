import VueVegaOptionHelper from 'src/util/VueVegaOptionHelper'

describe('VueVegaOptionHelper', () => {
  let options
  let vueVegaOptionHelper
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    options = {
      data () {
        return {values: [1, 2, 3]}
      }
    }
    vueVegaOptionHelper = new VueVegaOptionHelper()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('getting spec from vue options', () => {
    beforeEach(() => {
      sandbox.stub(vueVegaOptionHelper, 'isVegaLiteComponent')
    })

    it('should check on vue component', () => {
      vueVegaOptionHelper.getVegaSpec(options)

      expect(vueVegaOptionHelper.isVegaLiteComponent).to.have.been.calledWith(options)
    })

    it('should create vega spec from custom options', () => {
      options = Object.assign({encoding: {}, mark: 'blabla'}, options)
      vueVegaOptionHelper.isVegaLiteComponent.returns(false)

      const spec = vueVegaOptionHelper.getVegaSpec(options)

      expect(spec).to.deep.equal({
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          values: [1, 2, 3]
        },
        mark: 'blabla',
        encoding: {}
      })
    })

    it('should get spec from properties when data is array without values', () => {
      const propsData = {encoding: {}, mark: 'blabla', data: [1, 2, 3]}
      options = Object.assign({propsData}, options)
      vueVegaOptionHelper.isVegaLiteComponent.returns(true)

      const spec = vueVegaOptionHelper.getVegaSpec(options)

      expect(spec).to.deep.equal({
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          values: [1, 2, 3]
        },
        mark: 'blabla',
        encoding: {}
      })
    })

    it('should get spec from properties when data is object without values', () => {
      const propsData = {encoding: {}, mark: 'blabla', data: {test: 'test'}}
      options = Object.assign({propsData}, options)
      vueVegaOptionHelper.isVegaLiteComponent.returns(true)

      const spec = vueVegaOptionHelper.getVegaSpec(options)

      expect(spec).to.deep.equal({
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          test: 'test'
        },
        mark: 'blabla',
        encoding: {}
      })
    })
  })

  describe('isVegaLiteCompatible', () => {
    it('should be false if options don\'t contain `mark` field', () => {
      options = Object.assign({encoding: {}}, options)
      expect(vueVegaOptionHelper.isVegaLiteCompatible(options)).to.be.false
    })

    it('should be false if options don\'t contain `encoding` field', () => {
      options = Object.assign({mark: 'blabla'}, options)
      expect(vueVegaOptionHelper.isVegaLiteCompatible(options)).to.be.false
    })

    it('should be false if options don\'t contain `data` field', () => {
      delete options.data
      options = Object.assign({mark: 'blabla', encoding: {}}, options)

      expect(vueVegaOptionHelper.isVegaLiteCompatible(options)).to.be.false
    })
  })

  describe('isTemplateRequired', () => {
    beforeEach(() => {
      options = Object.assign({mark: 'blabla', encoding: {}}, options)
    })

    it('should be true if template or el doesn`t present in options', () => {
      expect(vueVegaOptionHelper.isTemplateRequired(options)).to.be.true
    })

    it('should be false if template present in options', () => {
      options.template = 'template'

      expect(vueVegaOptionHelper.isTemplateRequired(options)).to.be.false
    })

    it('should be false if el present in options', () => {
      options.el = 'el'

      expect(vueVegaOptionHelper.isTemplateRequired(options)).to.be.false
    })

    it('should be false if it`s not a vega lite', () => {
      options = {template: 'template'}

      expect(vueVegaOptionHelper.isTemplateRequired(options)).to.be.false
    })
  })
})

