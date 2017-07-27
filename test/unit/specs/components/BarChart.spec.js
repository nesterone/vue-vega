import Vue from 'vue'
import BarChart from 'examples/BarChart'
import VueVegaPlugin from 'vue-vega'

describe('BarChart.vue', () => {
  let LocalVue = Vue.extend({})
  LocalVue.use(VueVegaPlugin)

  it('should render correct contents', () => {
    const Constructor = LocalVue.extend(BarChart)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.mark-text.role-axis-title text').textContent).to.equal('a')
  })
})
