import {cloneDeep, pick, omit} from 'lodash-es'

const CUSTOM_VEGA_LITE_OPTIONS = ['encoding', 'mark', 'description']

export default class VueVegaOptionHelper {
  constructor ({ vegaLiteComponentOptions }) {
    this.vegaLiteComponentOptions = vegaLiteComponentOptions
  }

  moveCustomOptionsToPropsDefault (vueComponentOptions) {
    const customOptions = pick(vueComponentOptions, CUSTOM_VEGA_LITE_OPTIONS)
    const optionsWithoutCustom = omit(vueComponentOptions, CUSTOM_VEGA_LITE_OPTIONS)
    let resultOptions = cloneDeep(this.vegaLiteComponentOptions)

    Object.assign(resultOptions, optionsWithoutCustom)

    const props = resultOptions.props
    const {mark, encoding, description} = customOptions

    props.mark.default = mark
    props.description.default = description
    props.encoding.default = () => encoding
    props.data.default = vueComponentOptions.data

    return resultOptions
  }

  containsVegaLiteCustomOptions (options) {
    const isDataAvailable = Boolean(options.data)
    const isMarkAvailable = Boolean(options.mark)
    const isEncodingAvailable = Boolean(options.encoding)

    return isDataAvailable && isMarkAvailable && isEncodingAvailable
  }
}
