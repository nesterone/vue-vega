import vegaLiteComputed from 'src/components/computed'

describe('vegaLiteComputed', () => {
  const sandbox = sinon.sandbox.create()
  let vegaLiteSpecProps
  let vegaLiteCompileOutput
  let vegaLiteSpecResult
  let vegaLiteCompileDelegate
  let context
  let {vegaSpec, vegaLiteSpec} = vegaLiteComputed

  beforeEach(() => {
    vegaLiteSpecProps = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      height: 12,
      width: 11,
      autoResize: true,
      background: 'red',
      padding: 10,
      config: {
        fillStroke: 'green'
      },
      name: 'test-spec',
      selection: {
        touch: {type: 'single', on: 'dblclick'}
      },
      title: 'Test Chart',
      transform: [
        {
          bin: true,
          field: 'IMDB_Rating',
          as: 'bin_IMDB_Rating'
        }
      ],
      description: 'BlaBla',
      mark: 'bar',
      encoding: {
        x: {field: 'a', type: 'Q'}
      },
      data: [1, 2, 3]
    }

    vegaLiteSpecResult = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
      description: 'BlaBla',
      mark: 'bar',
      encoding: {
        x: {field: 'a', type: 'Q'}
      },
      data: {
        values: []
      },
      height: 12,
      width: 11,
      autoResize: true,
      background: 'red',
      padding: 10,
      config: {
        fillStroke: 'green'
      },
      name: 'test-spec',
      selection: {
        touch: {type: 'single', on: 'dblclick'}
      },
      title: 'Test Chart',
      transform: [
        {
          bin: true,
          field: 'IMDB_Rating',
          as: 'bin_IMDB_Rating'
        }
      ]
    }

    vegaLiteCompileOutput = {
      spec: {description: 'compiled vega spec here'}
    }

    vegaLiteCompileDelegate = {
      compileVegaLite: sandbox.stub().returns(vegaLiteCompileOutput)
    }

    let someOtheStuff = {
      blabla: 111,
      zzzzz: 1
    }

    context = {
      ...vegaLiteSpecProps,
      ...vegaLiteCompileDelegate,
      ...someOtheStuff
    }
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should combine all props in one spec object', () => {
    const specResult = vegaLiteSpec.call(context)

    expect(specResult).to.deep.equal(vegaLiteSpecResult)
  })

  it('should call passed compiler delegate with vega lite spec props', () => {
    context.vegaLiteSpec = vegaLiteSpecResult

    vegaSpec.call(context)

    expect(context.compileVegaLite).to.have.calledWith(vegaLiteSpecResult)
  })

  it('should compile vega lite spec and provide a vega spec', () => {
    context.vegaLiteSpec = vegaLiteSpecResult

    const spec = vegaSpec.call(context)

    expect(spec).to.deep.equal(vegaLiteCompileOutput.spec)
  })
})
