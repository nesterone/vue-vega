import {
  mapVegaLiteSpec,
  mapVegaSpecToComponentOptions
} from 'src/util/vueVegaUtils'

import vegaLiteSpecSamples from '../vegaLiteSpecSamples'

describe('vueVegaUtil', () => {
  const sandbox = sinon.sandbox.create()

  function checkComponentPropsDefaults (specName) {
    console.info('Checking props for: ', specName)

    const spec = vegaLiteSpecSamples[specName]
    const newVegaLiteComponent = mapVegaLiteSpec(spec)
    const newVegaLiteComponentProps = newVegaLiteComponent.props

    for (let specPropKey of Object.keys(spec)) {
      const componentPropDefinition = newVegaLiteComponentProps[specPropKey]
      console.info('Checking spec props key for: ', specPropKey)

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

  it('should map spec to components with props equals to spec props', () => {
    const sampleNames = Object.keys(vegaLiteSpecSamples)
    sampleNames.forEach((sampleName) => checkComponentPropsDefaults(sampleName))
  })
})

