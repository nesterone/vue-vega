import dataSpecWatch from 'src/components/watch/dataWatch'
import {changeset} from 'vega'

describe('Vega Data Watch', () => {
  const sandbox = sinon.sandbox.create()
  const vegaSpec = 'vegaSpec'
  const vegaView = 'vegaView'
  const nextData = 'nextData'
  const prevData = 'prevData'
  let vegaDelegate
  let context

  beforeEach(() => {
    vegaDelegate = {
      streamDataToVegaView: sandbox.stub()
    }

    context = {
      ...vegaDelegate,
      vegaSpec: vegaSpec,
      $vg: vegaView
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should watch deep', () => {
    expect(dataSpecWatch.deep).to.be.true
  })

  it('should destroy vega view if it was already mounted', () => {
    context.$vg = vegaView

    dataSpecWatch.handler.call(context, nextData, prevData)

    expect(vegaDelegate.streamDataToVegaView)
      .to.have.been
      .calledWith(
        vegaView,
        nextData,
        prevData,
        vegaSpec,
        changeset
      )
  })

  it('should`t  stream data to delegate if view wasn`t created ', () => {
    context.$vg = null

    dataSpecWatch.handler.call(context, nextData, prevData)

    expect(vegaDelegate.streamDataToVegaView).not.to.have.been.called
  })
})
