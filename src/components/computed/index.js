import vegaLiteProps from '../props'
import assemblePropsToSpec from './assemblePropsToSpec'

export default {
  vegaSpec () {
    const compileOutput = this.compileVegaLite(this.vegaLiteSpec)
    return compileOutput.spec
  },
  vegaLiteSpec () {
    return assemblePropsToSpec.call(this, vegaLiteProps)
  },
  dataUrl () {
    return null
  }
}

