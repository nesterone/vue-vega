const DEFAULT_TEMPLATE = '<div></div>'

export default function vueExtendProxy ({extendFn, vueOptionSpec}) {
  return function proxiedExtend (options) {
    if (vueOptionSpec.isTemplateRequired(options)) {
      options.template = DEFAULT_TEMPLATE
    }

    return extendFn.apply(this, arguments)
  }
}
