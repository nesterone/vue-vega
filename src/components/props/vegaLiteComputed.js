export default {
  vegaLiteSpec () {
    return {
      '$schema': this.schema,
      description: this.description,
      mark: this.mark,
      encoding: this.encoding,
      data: {values: []}
    }
  },
  vegaSpec () {
    const compileOutput = this.compileVegaLite(this.vegaLiteSpec)
    return compileOutput.spec
  }
}

