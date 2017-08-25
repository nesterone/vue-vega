import vegaSpecWatch from 'src/components/watch/vegaSpecWatch'

describe('Vega Spec Watch', () => {
  const sandbox = sinon.sandbox.create()
  const vegaSpec = 'vegaSpec'
  const vegaView = 'vegaView'
  const elem = 'elem'
  let vegaViewDelegate
  let context

  beforeEach(() => {
    vegaViewDelegate = {
      createVegaView: sandbox.stub(),
      mountVegaView: sandbox.stub(),
      destroyVegaView: sandbox.stub()
    }

    context = {
      ...vegaViewDelegate
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should watch deep', () => {
    expect(vegaSpecWatch.deep).to.be.true
  })

  it('should destroy vega view if it was already mounted', () => {
    context.$vg = vegaView

    vegaSpecWatch.handler.call(context)

    expect(vegaViewDelegate.destroyVegaView).to.have.been.calledWith(vegaView)
  })

  it('should`t  call destroy if vega view wasn`t created yet', () => {
    vegaSpecWatch.handler.call(context)

    expect(vegaViewDelegate.destroyVegaView).not.to.have.been.called
  })

  it('should create vega view within new spec', () => {
    vegaSpecWatch.handler.call(context, vegaSpec)

    expect(vegaViewDelegate.createVegaView).to.have.been.calledWith(vegaSpec)
  })

  it('should mount vega view if component was mounted', () => {
    context.$el = elem
    vegaViewDelegate
      .createVegaView
      .withArgs(vegaSpec)
      .returns(vegaView)

    vegaSpecWatch.handler.call(context, vegaSpec)

    expect(vegaViewDelegate.mountVegaView).to.have.been.calledWith(vegaView, elem)
  })
})
