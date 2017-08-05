import Vue from 'vue'
import BarChartAsComponent from 'examples/BarChartAsComponent'
import VueVega from 'src/index'

describe('BarChart.vue', () => {
  let LocalVue = Vue
  // TODO: in 'Provide scoped vue instance for testing plugin #16'
  LocalVue.use(VueVega)

  it('should render correct contents', () => {
    const Constructor = LocalVue.extend(BarChartAsComponent)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('.mark-text.role-axis-title text').textContent).to.equal('a')
  })
})
