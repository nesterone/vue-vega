export default {
  isVegaLite (options) {
    const isDataAvailable = Boolean(options.data)
    const isMarkAvailable = Boolean(options.mark)
    const isEncodingAvailable = Boolean(options.encoding)

    return isDataAvailable && isMarkAvailable && isEncodingAvailable
  }
}
