export default function vueExtendProxy ({extendFn, vueVegaOptionHelper}) {
  return function proxiedExtend (...vueExtendArguments) {
    let vueComponentOptions = vueExtendArguments.shift()

    if (vueVegaOptionHelper.containsVegaLiteCustomOptions(vueComponentOptions)) {
      vueComponentOptions = vueVegaOptionHelper.moveCustomOptionsToPropsDefault(vueComponentOptions)
    }

    return extendFn.apply(this, [vueComponentOptions].concat(vueExtendArguments))
  }
}
