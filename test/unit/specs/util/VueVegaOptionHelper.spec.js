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
    sandbox.stub(vueVegaOptionHelper, 'isVegaLiteComponent')
  })

  afterEach(() => {
    sandbox.restore()
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

