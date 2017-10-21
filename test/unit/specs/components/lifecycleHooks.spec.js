import {changeset} from 'vega'
import lifecycleHooks from 'src/components/lifecycleHooks'

describe('Component Lifecycle hooks', () => {
  const sandbox = sinon.sandbox.create()
  const vegaSpec = 'vegaSpec'
  const vegaView = 'vegaView'
  const elem = 'elem'
  const data = 'data'
  let vegaDelegate
  let context

  beforeEach(() => {
    vegaDelegate = {
      createVegaView: sandbox.stub(),
      mountVegaView: sandbox.stub(),
      destroyVegaView: sandbox.stub(),
      streamDataToVegaView: sandbox.stub(),
      addSignalEmitter: sandbox.stub(),
      addEventEmitter: sandbox.stub()
    }

    context = {
      $el: elem,
      vegaSpec: vegaSpec,
      ...vegaDelegate,
      data: data
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should attach `$vg` as vega view instance', () => {
    vegaDelegate.createVegaView.returns(vegaView)

    lifecycleHooks.created.call(context)

    expect(context.$vg).to.equal(vegaView)
  })

  it('should call delegate after component was created', () => {
    lifecycleHooks.created.call(context)

    expect(vegaDelegate.createVegaView).to.have.been.calledWith(vegaSpec)
  })

  it('should mounte vega view and stream it with data', () => {
    context.$vg = vegaView

    lifecycleHooks.mounted.call(context)

    expect(vegaDelegate.mountVegaView).to.have.been.calledWith(vegaView, elem)
    expect(vegaDelegate.addSignalEmitter).to.have.been.calledWith(vegaView, vegaSpec, context)
    expect(vegaDelegate.addEventEmitter).to.have.been.calledWith(vegaView, context)
    expect(vegaDelegate.streamDataToVegaView).to.have.been.calledAfter(vegaDelegate.mountVegaView)
    expect(vegaDelegate.streamDataToVegaView).to.have.been.calledWith(vegaView, data, null, vegaSpec, changeset)
  })

  it('should call delegate before component would be destroyed', () => {
    context.$vg = vegaView

    lifecycleHooks.beforeDestroy.call(context)

    expect(vegaDelegate.destroyVegaView).to.have.been.calledWith(vegaView)
  })
})
