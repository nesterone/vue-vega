function isVegaLite (options) {
  const isDataAvailable = Boolean(options.data)
  const isMarkAvailable = Boolean(options.mark)
  const isEncodingAvailable = Boolean(options.encoding)

  return isDataAvailable && isMarkAvailable && isEncodingAvailable
}

function isTemplateRequired (options) {
  const isPossibleToRenderComponent = options.el || options.template || options.render

  return isVegaLite(options) && !isPossibleToRenderComponent
}

export default {
  isVegaLite,
  isTemplateRequired
}
