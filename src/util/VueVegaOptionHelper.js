const DEFAULT_VEGA_LITE_SPEC_TEMPLATE = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v2.json'
};
const DEFAULT_VEGA_LITE_COMPONENT_NAME = 'vega-lite'

export default class VueVegaOptionHelper {
  getVegaSpec (options) {
    const spec = Object.assign({}, DEFAULT_VEGA_LITE_SPEC_TEMPLATE)

    if (this.isVegaLiteComponent(options)) {
      let propsData = options.propsData;
      let data = propsData.data;

      if (Array.isArray(data)) {
        spec.data = {values: data};
      } else {
        spec.data = data
      }

      spec.mark = propsData.mark
      spec.encoding = propsData.encoding
    } else {
      spec.data = options.data()
      spec.mark = options.mark
      spec.encoding = options.encoding
    }
    return spec
  }

  shouldCreateVegaSpec (options) {
    return this.isVegaLiteCompatible(options) || this.isVegaLiteComponent(options)
  }

  isVegaLiteCompatible (options) {
    const isDataAvailable = Boolean(options.data)
    const isMarkAvailable = Boolean(options.mark)
    const isEncodingAvailable = Boolean(options.encoding)

    return isDataAvailable && isMarkAvailable && isEncodingAvailable
  }

  isTemplateRequired (options) {
    const isPossibleToRenderComponent = options.el || options.template || options.render

    return this.isVegaLiteCompatible(options) && !isPossibleToRenderComponent
  }

  isVegaLiteComponent (options) {
    return options.name === DEFAULT_VEGA_LITE_COMPONENT_NAME
  }
}
