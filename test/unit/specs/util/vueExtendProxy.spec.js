import vueExtendProxy from 'src/util/vueExtendProxy'

describe('vueExtendProxy', () => {
  let Vue
  let proxiedExtend
  let options
  let vueVegaOptionHelper
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    Vue = {
      extend: sandbox.stub()
    }

    vueVegaOptionHelper = {
      isTemplateRequired: sandbox.stub()
    }

    options = {
      mark: 'test',
      data: [1, 2, 3]
    }

    proxiedExtend = vueExtendProxy({
      extendFn: Vue.extend,
      vueVegaOptionHelper: vueVegaOptionHelper
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should check for template', () => {
    options = Object.assign({}, options)

    proxiedExtend(options)

    expect(vueVegaOptionHelper.isTemplateRequired).to.have.been.calledWith(options)
  })

  it('should add template to options if template required', () => {
    vueVegaOptionHelper.isTemplateRequired.returns(true)

    proxiedExtend(options)

    expect(options.template).to.equal('<div></div>')
  })

  it('should`t add template to options if template isn`t required', () => {
    vueVegaOptionHelper.isTemplateRequired.returns(false)

    proxiedExtend(options)

    expect(options.template).to.be.undefined
  })

  it('should call original extend', () => {
    proxiedExtend(options)

    expect(Vue.extend).to.have.been.calledWith(options)
  })
})
