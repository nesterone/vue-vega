import VegaLitePlugin from 'src/plugin/VegaLitePlugin'

describe('VegaLitePlugin', () => {
  let vegaLitePlugin
  let vueExtendProxy
  let Vue
  let proxiedExtend
  let originalExtend
  let vueVegaOptionHelper
  let VegaLiteComponent
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    vueExtendProxy = sandbox.stub()
    proxiedExtend = sandbox.stub()
    originalExtend = sandbox.stub()

    Vue = {
      extend: originalExtend,
      component: sandbox.stub()
    }

    vueVegaOptionHelper = {}

    VegaLiteComponent = sandbox.stub()

    vueExtendProxy.returns(proxiedExtend)

    vegaLitePlugin = new VegaLitePlugin({
      vueExtendProxy: vueExtendProxy,
      vueVegaOptionHelper: vueVegaOptionHelper,
      VegaLiteComponent: VegaLiteComponent
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('applying proxy for Vue extend', () => {
    it('should call hook with original Vue extend', () => {
      vegaLitePlugin.install(Vue)

      expect(vueExtendProxy).to.have.been.calledWith({
        extendFn: originalExtend,
        vueVegaOptionHelper: vueVegaOptionHelper
      })
    })

    it('should replace original extend with proxied version', () => {
      vegaLitePlugin.install(Vue)

      expect(Vue.extend).to.equal(proxiedExtend)
    })

    it('should register VegaLiteComponent as `vega-lite`', () => {
      vegaLitePlugin.install(Vue)

      expect(Vue.component).to.have.been.calledWith('vega-lite', VegaLiteComponent)
    })
  })
})

