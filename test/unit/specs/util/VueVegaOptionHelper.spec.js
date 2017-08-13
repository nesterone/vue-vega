import VueVegaOptionHelper from 'src/util/VueVegaOptionHelper'

describe('VueVegaOptionHelper', () => {
  let options
  let vueVegaOptionHelper
  let vegaLiteComponentOptions
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    options = {
      data () {
        return {values: [1, 2, 3]}
      }
    }
    vegaLiteComponentOptions = {}

    vueVegaOptionHelper = new VueVegaOptionHelper({vegaLiteComponentOptions})
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('detection of custom vega lite options', () => {
    it('should be false if options don\'t contain `mark` field', () => {
      options = Object.assign({encoding: {}}, options)
      expect(vueVegaOptionHelper.containsVegaLiteCustomOptions(options)).to.be.false
    })

    it('should be false if options don\'t contain `encoding` field', () => {
      options = Object.assign({mark: 'blabla'}, options)
      expect(vueVegaOptionHelper.containsVegaLiteCustomOptions(options)).to.be.false
    })

    it('should be false if options don\'t contain `data` field', () => {
      delete options.data
      options = Object.assign({mark: 'blabla', encoding: {}}, options)

      expect(vueVegaOptionHelper.containsVegaLiteCustomOptions(options)).to.be.false
    })
  })

  describe('moving custom vega lite options to component props default', () => {
    beforeEach(() => {
      options = {
        description: 'blabla',
        mark: 'bar',
        encoding: {
          x: {type: 'Q'},
          y: {type: 'N'}
        },
        data () {
          return {values: [1, 2, 3]}
        }
      }

      vegaLiteComponentOptions = {
        template: '<div></div>',
        props: {
          mark: {},
          description: {},
          encoding: {},
          data: {}
        }
      }

      vueVegaOptionHelper = new VueVegaOptionHelper({vegaLiteComponentOptions})
    })

    it('should move custom option to props default', () => {
      const result = vueVegaOptionHelper.moveCustomOptionsToPropsDefault(options)

      expect(result.props.mark.default).to.equal(options.mark)
      expect(result.props.description.default).to.equal(options.description)
      expect(result.props.encoding.default()).to.deep.equal(options.encoding)
      expect(result.props.data.default()).to.deep.equal(options.data())
      expect(result.data()).to.deep.equal(options.data())
    })

    it('should add template to options if template required', () => {
      let optionsResult = vueVegaOptionHelper.moveCustomOptionsToPropsDefault(options)

      expect(optionsResult.template).to.equal(vegaLiteComponentOptions.template)
    })
  })
})

