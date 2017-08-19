export default {
  vegaLiteSpec () {
    const spec = {
      '$schema': this.schema,
      description: this.description,
      mark: this.mark,
      encoding: this.encoding
    }

    if (Array.isArray(this.data)) {
      spec.data = {values: this.data}
    } else {
      spec.data = this.data
    }

    return spec
  },
  vegaSpec () {
    const compileOutput = this.compileVegaLite(this.vegaLiteSpec)
    return compileOutput.spec
  }
}

