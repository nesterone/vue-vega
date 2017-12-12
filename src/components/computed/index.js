import vegaLiteProps from '../props'
import assemblePropsToSpec from './assemblePropsToSpec'

export default {
  vegaSpec () {
    const compileOutput = this.compileVegaLite(this.vegaLiteSpec)
    return compileOutput.spec
  },
  vegaLiteSpec () {
    let vegaLiteSpec = assemblePropsToSpec.call(this, vegaLiteProps)

    const fullSpec = this.spec
    if (fullSpec) {
      Object.assign(vegaLiteSpec, fullSpec)
      delete vegaLiteSpec.spec
    }

    return vegaLiteSpec
  },
  dataUrl () {
    let url
    if (this.data && this.data.url) {
      url = this.data.url
    }
    return url
  }
}

