<template lang='pug'>
  div
    vega-lite(
      :spec='spec'
    )
</template>

<script>
  export default {
    data () {
      return {
        spec: {
          '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
          'data': {'url': 'data/cars.json'},
          'mark': 'bar',
          'encoding': {
            'x': {
              'bin': {'maxbins': 15},
              'field': 'Horsepower',
              'type': 'quantitative'
            },
            'y': {
              'aggregate': 'count',
              'type': 'quantitative'
            }
          }
        }

      }
    }
  }
</script>
