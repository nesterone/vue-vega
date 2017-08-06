const DEFAULT_VEGA_LITE_COMPONENT_NAME = 'vega-lite'

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

function isVegaLiteComponent (options) {
  return options.name === DEFAULT_VEGA_LITE_COMPONENT_NAME
}

function shouldCreateVegaSpec (options) {
  return isVegaLiteCompatible(options) && isVegaLiteComponent(options)
}

export default {
  isVegaLiteCompatible,
  isTemplateRequired,
  shouldCreateVegaSpec,
  isVegaLiteComponent
}
