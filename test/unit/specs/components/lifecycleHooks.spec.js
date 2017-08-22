import lifecycleHooks from 'src/components/lifecycleHooks'

describe('Component Lifecycle hooks', () => {
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
      $el: elem,
      vegaSpec: vegaSpec,
      ...vegaViewDelegate
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should attach `$vg` as vega view instance', () => {
    vegaViewDelegate.createVegaView.returns(vegaView)

    lifecycleHooks.created.call(context)

    expect(context.$vg).to.equal(vegaView)
  })

  it('should call delegate after component was created', () => {
    lifecycleHooks.created.call(context)

    expect(vegaViewDelegate.createVegaView).to.have.been.calledWith(vegaSpec)
  })

  it('should call delegate after component was mounted', () => {
    context.$vg = vegaView

    lifecycleHooks.mounted.call(context)

    expect(vegaViewDelegate.mountVegaView).to.have.been.calledWith(vegaView, elem)
  })

  it('should call delegate before component would be destroyed', () => {
    context.$vg = vegaView

    lifecycleHooks.beforeDestroy.call(context)

    expect(vegaViewDelegate.destroyVegaView).to.have.been.calledWith(vegaView)
  })
})
