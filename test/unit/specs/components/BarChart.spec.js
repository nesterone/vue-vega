import Vue from 'vue'
import BarChart from 'src/components/BarChart'
import VueVegaPlugin from 'src/index'

describe('BarChart.vue', () => {
  let LocalVue = Vue.extend({})
  LocalVue.use(VueVegaPlugin)

  it('should render correct contents', () => {
    const Constructor = LocalVue.extend(BarChart)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.mark-text.role-axis-title text').textContent).to.equal('a')
  })
})
