export default {
  name: 'vega-lite',
  template: '<div></div>',
  props: {
    mark: {
      type: String
    },
    encoding: {
      type: Object
    },
    data: [Object, Array]
  }
}
