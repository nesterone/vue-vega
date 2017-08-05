export default {
  name: 'vega-lite',
  template: '<div></div>',
  props: {
    mark: {
      type: String
    },
    data: {
      type: Object
    },
    encoding: {
      type: Object
    }
  }
}
