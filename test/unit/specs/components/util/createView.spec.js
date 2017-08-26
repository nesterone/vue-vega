import {createView} from 'src/components/util/vegaHelpers'
import {
  LOG_LEVEL,
  RENDER_TYPE
} from 'src/constants'

describe('createView', () => {
  const sandbox = sinon.sandbox.create()
  const logLevel = LOG_LEVEL
  const renderType = RENDER_TYPE

  let View
  let view
  let parse
  let spec
  let options
  let runtime

  beforeEach(() => {
    spec = {
      data: {
        values: [
          {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
          {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
          {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
        ]
      },
      mark: 'bar',
      encoding: {
        x: {field: 'a', type: 'ordinal'},
        y: {field: 'b', type: 'quantitative'}
      }
    }

    runtime = 'runtime'

    View = sandbox.stub()
    parse = sandbox.stub()

    view = {
      logLevel: sandbox.stub(),
      renderer: sandbox.stub(),
      hover: sandbox.stub()
    }

    view.logLevel.returns(view)
    view.renderer.returns(view)
    view.hover.returns(view)

    parse.returns(runtime)
    View.returns(view)

    options = {
      parse,
      View,
      logLevel,
      renderType
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should compile spec from context and pass it to parser', () => {
    createView(options, spec)

    expect(parse).to.have.been.calledWith(spec)
    expect(parse).to.have.been.calledBefore(View)
  })

  it('should create View instance', () => {
    createView(options, spec)

    expect(View).to.have.been.calledWith(runtime)
  })

  it('should set log level', () => {
    createView(options, spec)

    expect(view.logLevel).to.have.been.calledWith(logLevel)
  })

  it('should set renderer type', () => {
    createView(options, spec)

    expect(view.renderer).to.have.been.calledWith(renderType)
  })

  it('should enable hover', () => {
    createView(options, spec)

    expect(view.hover).to.have.been.called
  })
})
