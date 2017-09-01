import {
  mapVegaLiteSpecToComponentOptions,
  mapVegaSpecToComponentOptions
} from 'src/util/vueVegaUtils'

describe('vueVegaUtil', () => {
  let vegaLiteSpec
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    vegaLiteSpec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v2.json',
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
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should have defined, but without implementation', () => {
    expect(mapVegaSpecToComponentOptions()).to.be.null
  })

  it('should convert spec to component with props defaults the same as spec props', () => {
    const newVegaLiteComponent = mapVegaLiteSpecToComponentOptions(vegaLiteSpec)
    const newVegaLiteComponentProps = newVegaLiteComponent.props

    for (let specPropKey of Object.keys(vegaLiteSpec)) {
      const componentPropDefinition = newVegaLiteComponentProps[specPropKey]
      const defaultPropValue = componentPropDefinition.default()
      const specPropValue = vegaLiteSpec[specPropKey]

      expect(defaultPropValue).to.deep.equal(specPropValue)
    }
  })
})

