export default {
  vegaLiteSpec () {
    const spec = Object.assign({
      description: this.description,
      mark: this.mark,
      encoding: this.encoding
    }, {'$schema': this.schema})

    if (Array.isArray(this.data)) {
      spec.data = {values: this.data}
    } else {
      spec.data = this.data
    }
    return spec
  }
}
