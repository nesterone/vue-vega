import {compile} from 'vega-lite'
import vegaLiteDelegate from 'src/components/delegate/vegaLiteDelegate'

describe('vegaLiteCompilerDelegate', () => {
  it('should delegate to vega lite by default', () => {
    expect(vegaLiteDelegate.compileVegaLite).to.be.equal(compile)
  })
})
