import createVegaLiteComponent from 'src/component/createVegaLiteComponent'

describe('createVegaLiteComponent', () => {
  let context
  let compile
  const sandbox = sinon.sandbox.create()
  let vegaLiteComponentOptions

  beforeEach(() => {
    compile = sandbox.stub()

    vegaLiteComponentOptions = createVegaLiteComponent({compile})
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should have `vega-lite` name', () => {
    expect(vegaLiteComponentOptions.name).to.equal('vega-lite')
  })

  describe('computed', () => {
    let vegaLiteSpec
    let vegaLiteSpecProps
    let vegaLiteCompileOutput

    beforeEach(() => {
      vegaLiteSpecProps = {
        description: 'BlaBla',
        mark: 'bar',
        encoding: {
          x: {field: 'a', type: 'Q'}
        },
        data: [1, 2, 3]
      }

      vegaLiteSpec = Object.assign({}, vegaLiteSpecProps, {
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          values: [1, 2, 3]
        }
      })

      vegaLiteCompileOutput = {
        spec: {description: 'compiled vega spec here'}
      }

      compile = sandbox.stub().returns(vegaLiteCompileOutput)
      vegaLiteComponentOptions = createVegaLiteComponent({compile})

      context = Object.assign({}, vegaLiteSpecProps, {
        test: 'one',
        ping: 'two'
      })
    })

    it('should combine all props in one spec object', () => {
      const specResult = vegaLiteComponentOptions.computed.vegaLiteSpec.call(context)

      expect(specResult).to.deep.equal(vegaLiteSpec)
    })

    it('should call passed compiler with vega lite spec props', () => {
      context = Object.assign({vegaLiteSpec: vegaLiteSpec}, context)

      vegaLiteComponentOptions.computed.vegaSpec.call(context)

      expect(compile).to.have.calledWith(vegaLiteSpec)
    })

    it('should compile vega lite spec and provide a vega spec', () => {
      context = Object.assign({vegaLiteSpec: vegaLiteSpecProps}, context)

      const vegaSpec = vegaLiteComponentOptions.computed.vegaSpec.call(context)

      expect(vegaSpec).to.deep.equal(vegaLiteCompileOutput.spec)
    })
  })
})
