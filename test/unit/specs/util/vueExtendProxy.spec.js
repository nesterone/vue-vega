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
      containsVegaLiteCustomOptions: sandbox.stub(),
      moveCustomOptionsToPropsDefault: sandbox.stub()
    }

    options = {
      mark: 'test',
      data: () => [1, 2, 3]
    }

    proxiedExtend = vueExtendProxy({
      extendFn: Vue.extend,
      vueVegaOptionHelper: vueVegaOptionHelper
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should check for vega lite compatible', () => {
    options = Object.assign({}, options)

    proxiedExtend(options)

    expect(vueVegaOptionHelper.containsVegaLiteCustomOptions).to.have.been.calledWith(options)
  })

  it('should move custom options to props default if vega compatible options', () => {
    vueVegaOptionHelper.containsVegaLiteCustomOptions.returns(true)

    proxiedExtend(options)

    expect(vueVegaOptionHelper.moveCustomOptionsToPropsDefault).to.have.been.calledWith(options)
  })

  xit('should call original extend', () => {
    proxiedExtend(options)

    expect(Vue.extend).to.have.been.calledWith(options)
  })
})
