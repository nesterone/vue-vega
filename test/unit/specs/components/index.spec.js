import {VegaLiteComponent} from 'src/components/index'
import vegaLiteProps from 'src/components/vegaLiteProps'
import vegaLiteComputed from 'src/components/vegaLiteComputed'
import vegaLiteCompilerDelegate from 'src/components/vegaLiteCompilerDelegate'
import vegaViewDelegate from 'src/components/vegaViewDelegate'

describe('Components', () => {
  describe('VegaLiteComponent', () => {
    it('should have default template', () => {
      expect(VegaLiteComponent.template).to.equal('<div></div>')
    })

    it('should have default name', () => {
      expect(VegaLiteComponent.name).to.equal('vega-lite')
    })

    it('should have default props', () => {
      expect(VegaLiteComponent.props).to.deep.equal(vegaLiteProps)
    })

    it('should have default computed', () => {
      expect(VegaLiteComponent.computed).to.deep.equal(vegaLiteComputed)
    })

    it('should have default compiler delegate', () => {
      const delegateKeys = Object.keys({
        ...vegaLiteCompilerDelegate,
        ...vegaViewDelegate
      })
      expect(VegaLiteComponent.methods).to.have.all.keys(delegateKeys)
    })
  })
})
