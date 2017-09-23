import vegaLiteProps from '../props'
import assemblePropsToSpec from './assemblePropsToSpec'

export default {
  vegaSpec () {
    const compileOutput = this.compileVegaLite(this.vegaLiteSpec)
    return compileOutput.spec
  },
  vegaLiteSpec () {
    const vegaLiteSpec = assemblePropsToSpec.call(this, vegaLiteProps)
    console.log(JSON.stringify(vegaLiteSpec))
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

