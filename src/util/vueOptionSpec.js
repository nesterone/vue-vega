function isVegaLiteCompatible (options) {
  const isDataAvailable = Boolean(options.data)
  const isMarkAvailable = Boolean(options.mark)
  const isEncodingAvailable = Boolean(options.encoding)

  return isDataAvailable && isMarkAvailable && isEncodingAvailable
}

function isTemplateRequired (options) {
  const isPossibleToRenderComponent = options.el || options.template || options.render

  return isVegaLiteCompatible(options) && !isPossibleToRenderComponent
}

export default {
  isVegaLiteCompatible,
  isTemplateRequired
}
