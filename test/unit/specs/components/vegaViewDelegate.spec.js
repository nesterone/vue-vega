import vegaViewDelegate from 'src/components/vegaViewDelegate'

describe('vegaViewDelegate', () => {
  const sandbox = sinon.sandbox.create()
  let vegaView
  let element
  let {
    mountVegaView,
    destroyVegaView
  } = vegaViewDelegate

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
})
