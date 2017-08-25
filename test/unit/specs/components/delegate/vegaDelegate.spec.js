import vegaDelegate from 'src/components/delegate/vegaDelegate'
import vegaSpecToRender from '../../../mock/vegaSpecToRender'

describe('vegaViewDelegate', () => {
  const sandbox = sinon.sandbox.create()
  let vegaView
  let element
  let {
    createVegaView,
    mountVegaView,
    destroyVegaView
  } = vegaDelegate

  beforeEach(() => {
    vegaView = {
      initialize: sandbox.stub(),
      run: sandbox.stub(),
      finalize: sandbox.stub()
    }

    element = 'el'

    vegaView.initialize.returns(vegaView)
    vegaView.run.returns(vegaView)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should initialize vega view within provided element', () => {
    mountVegaView(vegaView, element)

    expect(vegaView.initialize).to.have.been.calledWith(element)
    expect(vegaView.run).to.have.been.calledAfter(vegaView.initialize)
  })

  it('should destroy vega view', () => {
    destroyVegaView(vegaView)

    expect(vegaView.finalize).to.have.been.called
  })

  xit('should be initialized', () => {
    // TODO: in #22, we want to change that partial got proper function
    vegaView = createVegaView(vegaSpecToRender)

    expect(vegaView).to.be.ok
  })
})
