import {VegaLiteComponent} from 'src/components/index'
import vegaLiteComputed from 'src/components/props/vegaLiteComputed'
import vegaLiteDelegate from 'src/components/delegate/vegaLiteDelegate'
import {
  VEGA_LITE_SCHEMA_URL
} from 'src/constants'

describe('Components', () => {
  describe('VegaLiteComponent', () => {
    it('should have default template', () => {
      expect(VegaLiteComponent.template).to.equal('<div></div>')
    })

    it('should have default name', () => {
      expect(VegaLiteComponent.name).to.equal('vega-lite')
    })

    it('should have default for $schema', () => {
      expect(VegaLiteComponent.props.$schema.default).to.equal(VEGA_LITE_SCHEMA_URL)
    })

    it('should have default computed', () => {
      expect(VegaLiteComponent.computed).to.deep.equal(vegaLiteComputed)
    })

    it('should have default compiler delegate', () => {
      const delegateKeys = Object.keys({
        ...vegaLiteDelegate
      })

      expect(VegaLiteComponent.methods).to.have.all.keys(delegateKeys)
    })
  })
})
