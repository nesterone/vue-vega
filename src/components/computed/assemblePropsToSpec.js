import { omit, reduce } from 'lodash-es'

export default function assemblePropsToSpec (props) {
  const result = {
    data: {values: []}
  }
  const context = this

  props = omit(props, 'data')

  if (this.dataUrl) {
    props.data = {
      url: this.dataUrl
    }
  }

  return reduce(props, function (memo, value, key) {
    const contextValue = context[key]
    if (contextValue) {
      memo[key] = contextValue
    }
    return memo
  }, result)
}
