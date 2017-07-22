import VegaLitePlugin from 'src/plugin/VegaLitePlugin';

describe('VegaLitePlugin', () => {
  const sandbox = sinon.sandbox.create()
  let vegaLitePlugin
  let vegaLiteMixin
  let vueExtendProxy
  let Vue
  let proxiedExtend
  let originalExtend

  beforeEach(() => {
    vegaLiteMixin = sandbox.stub()
    vueExtendProxy = sandbox.stub()
    proxiedExtend = sandbox.stub()
    originalExtend = sandbox.stub()

    Vue = {
      mixin: sandbox.stub(),
      extend: originalExtend
    }

    vueExtendProxy
      .withArgs(Vue.extend)
      .returns(proxiedExtend)

    vegaLitePlugin = new VegaLitePlugin({
      mixin: vegaLiteMixin,
      vueExtendProxy: vueExtendProxy
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

      expect(vueExtendProxy).to.have.been.calledWith(originalExtend);
    })

    it('should replace original extend with proxied version', () => {
      vegaLitePlugin.install(Vue)

      expect(Vue.extend).to.equal(proxiedExtend)
    })
  })
})

