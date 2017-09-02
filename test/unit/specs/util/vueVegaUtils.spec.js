import {
  mapVegaLiteSpecToComponentOptions,
  mapVegaSpecToComponentOptions
} from 'src/util/vueVegaUtils'

import {
  VegaLiteBar
} from '../vegaLiteSpecSamples'

describe('vueVegaUtil', () => {
  const sandbox = sinon.sandbox.create()

  function checkComponentProps (spec) {
    const newVegaLiteComponent = mapVegaLiteSpecToComponentOptions(spec)
    const newVegaLiteComponentProps = newVegaLiteComponent.props

    for (let specPropKey of Object.keys(spec)) {
      const componentPropDefinition = newVegaLiteComponentProps[specPropKey]
      const defaultPropValue = componentPropDefinition.default()
      const specPropValue = spec[specPropKey]

      expect(defaultPropValue).to.deep.equal(specPropValue)
    }
  }

  afterEach(() => {
    sandbox.restore()
  })

  it('should have defined, but without implementation', () => {
    expect(mapVegaSpecToComponentOptions()).to.be.null
  })

  it('should convert spec to component with props defaults the same as spec props', () => {
    checkComponentProps(VegaLiteBar)
  })
})

