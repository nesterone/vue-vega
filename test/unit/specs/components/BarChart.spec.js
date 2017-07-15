import Vue from 'vue'
import BarChart from 'src/components/BarChart'

describe('BarChart.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(BarChart)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.mark-text.role-axis-title text').textContent).to.equal('a')
  })
})
