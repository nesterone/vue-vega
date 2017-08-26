<template lang='pug'>
  div
    multiselect(
      :options='options',
      :multiple='true',
      :close-on-select='true',
      :clear-on-select='false',
      :hide-selected='true',
      :preserve-search='false',
      placeholder='Add Channel'
      label='name',
      track-by='name',
      @select='addEncodingChannel',
      @remove='removeEncodingChannel'
    )
    vega-lite(
      :data='data',
      :mark='mark',
      :encoding='encoding'
    )
</template>

<script>
  import Vue from 'vue'
  import Multiselect from 'vue-multiselect'
  import cars from './data/cars.json'

  export default {
    components: {
      Multiselect
    },
    data () {
      return {
        data: cars,
        mark: 'point',
        encoding: {
          x: {field: 'Horsepower', type: 'quantitative'},
          y: {field: 'Miles_per_Gallon', type: 'quantitative'}
        },
        options: [
          {
            name: 'Origin - Color',
            channel: {
              color: {field: 'Origin', type: 'nominal'}
            }
          },
          {
            name: 'Origin - Shape',
            channel: {
              shape: {field: 'Origin', type: 'nominal'}
            }
          },
          {
            name: 'Displacement - Opacity',
            channel: {
              opacity: {field: 'Displacement', type: 'quantitative'}
            }
          }
        ]
      }
    },
    methods: {
      addEncodingChannel (newOption) {
        const channel = newOption.channel
        const channelName = Object.keys(channel).pop()
        const channelVal = Object.values(channel).pop()
        Vue.set(this.encoding, channelName, channelVal)
      },
      removeEncodingChannel (option) {
        const channel = option.channel
        const channelName = Object.keys(channel).pop()
        Vue.delete(this.encoding, channelName)
      }
    }
  }
</script>
