import {VegaLiteComponent} from 'src/components/index'

describe('Components', () => {
  describe('VegaLiteComponent', () => {
    it('should have default template', () => {
      expect(VegaLiteComponent.template).to.equal('<div></div>')
    })

    it('should have default name', () => {
      expect(VegaLiteComponent.name).to.equal('vega-lite')
    })
  })
})
