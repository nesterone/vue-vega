import VegaLitePlugin from 'src/plugin/VegaLitePlugin';

describe('VegaLitePlugin', () => {
  let vegaLitePlugin
  let vegaLiteMixin
  let vueExtendProxy
  let Vue
  let proxiedExtend
  let originalExtend
  let vueOptionSpec
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    vegaLiteMixin = sandbox.stub()
    vueExtendProxy = sandbox.stub()
    proxiedExtend = sandbox.stub()
    originalExtend = sandbox.stub()

    Vue = {
      mixin: sandbox.stub(),
      extend: originalExtend
    }

    vueOptionSpec = {
      isTemplateRequired: sandbox.stub()
    }

    vueExtendProxy.returns(proxiedExtend)

    vegaLitePlugin = new VegaLitePlugin({
      mixin: vegaLiteMixin,
      vueExtendProxy: vueExtendProxy,
      vueOptionSpec: vueOptionSpec
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should add vega mixin to Vue', () => {
    vegaLitePlugin.install(Vue)

    expect(Vue.mixin).to.have.been.calledWith(vegaLiteMixin)
  })

  describe('appling proxy for Vue extend', () => {
    it('should call hook with original Vue extend', () => {
      vegaLitePlugin.install(Vue)

      expect(vueExtendProxy).to.have.been.calledWith({
        extendFn: originalExtend,
        vueOptionSpec: vueOptionSpec
      });
    })

    it('should replace original extend with proxied version', () => {
      vegaLitePlugin.install(Vue)

      expect(Vue.extend).to.equal(proxiedExtend)
    })
  })
})

