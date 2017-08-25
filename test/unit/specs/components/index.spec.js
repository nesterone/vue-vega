import {VegaLiteComponent} from 'src/components/index'
import vegaLiteProps from 'src/components/props/vegaLiteProps'
import vegaLiteComputed from 'src/components/props/vegaLiteComputed'
import vegaLiteCompilerDelegate from 'src/components/delegate/vegaLiteCompilerDelegate'
import vegaViewDelegate from 'src/components/delegate/vegaViewDelegate'

describe('Components', () => {
  describe('VegaLiteComponent', () => {
    it('should have default template', () => {
      expect(VegaLiteComponent.template).to.equal('<div></div>')
    })

    it('should have default name', () => {
      expect(VegaLiteComponent.name).to.equal('vega-lite')
    })

    xit('should have default props', () => {
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
