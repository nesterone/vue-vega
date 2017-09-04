import { VegaLiteComponent } from 'src/components/index'
import VueVega from 'src/index'

describe('VueVega', () => {
  let Vue
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    Vue = {
      component: sandbox.stub()
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should register VegaLiteComponent as `vega-lite` by default', () => {
    VueVega.install(Vue)

    expect(Vue.component).to.have.been.calledWith('vega-lite', VegaLiteComponent)
  })

  it('should export `mapVegaLiteSpec`', () => {
    expect(typeof VueVega.mapVegaLiteSpec).to.equal('function')
  })
})

