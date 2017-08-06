const DEFAULT_TEMPLATE = '<div></div>'

export default function vueExtendProxy ({extendFn, vueVegaOptionHelper}) {
  return function proxiedExtend (options) {
    if (vueVegaOptionHelper.isTemplateRequired(options)) {
      options.template = DEFAULT_TEMPLATE
    }
    return extendFn.apply(this, arguments)
  }
}
