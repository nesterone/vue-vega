<template>
  <div>
    <vega-lite mark="bar" :encoding="{x: {bin: true, field: 'val', type: 'quantitative'}, y: {aggregate: 'count', type: 'quantitative'} }" :data="values"></vega-lite>
    <button @click="refreshNumbers">Refresh</button>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        values: [
          {val: 1}, {val: 5}, {val: 3},
          {val: 4}, {val: 5}, {val: 6},
          {val: 7}, {val: 8}, {val: 9}
        ]
      }
    },
    methods: {
      refreshNumbers () {
        this.values = this.values.map(() => {
          return {val: Math.random() * 10}
        })
      }
    }
  }
</script>
