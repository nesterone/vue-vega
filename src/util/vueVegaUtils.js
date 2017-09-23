import { cloneDeep, reduce } from 'lodash-es'
import { VegaLiteComponent } from 'src/components/index'

export function mapVegaLiteSpec (vegaLiteSpec) {
  const NewComponentOptions = {}
  Object.assign(NewComponentOptions, VegaLiteComponent)

  let newComponentProps = cloneDeep(VegaLiteComponent.props)

  newComponentProps = reduce(vegaLiteSpec, (memo, propValue, propName) => {
    let prop = memo[propName]

    if (prop) {
      if (propValue) {
        prop.default = () => propValue
      }
      memo[propName] = prop
    }

    return memo
  }, newComponentProps)

  NewComponentOptions.props = newComponentProps

  return NewComponentOptions
}

export function mapVegaSpecToComponentOptions (vegaSpec) {
  return null
}
