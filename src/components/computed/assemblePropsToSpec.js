import {omit, reduce} from 'lodash-es'

export default function assemblePropsToSpec (props) {
  const result = {
    data: {values: []}
  }
  const context = this

  props = omit(props, 'data')

  if (this.dataUrl) {
    result.data = {
      url: this.dataUrl
    }
  }
  // TODO: if spec prop exist, pick it and merge all other in it

  return reduce(props, function (memo, value, key) {
    const contextValue = context[key]
    if (contextValue) {
      memo[key] = contextValue
    }
    return memo
  }, result)
}
