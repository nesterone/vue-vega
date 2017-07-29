import Vue from 'vue'
import BarChartAsComponent from 'examples/BarChartAsComponent'
import VueVega from 'src/index'

console.log(Vue)
console.log(BarChartAsComponent)
console.log(VueVega)

xdescribe('BarChart.vue', () => {
  let LocalVue = Vue.extend({})
  LocalVue.use(VueVega)

  it('should render correct contents', () => {
    // BarChartAsComponent.template = `<div id='app'>
    //                                   <BarChart description='A simple bar chart with embedded data'></BarChart>
    //                                 </div>`

    const Constructor = LocalVue.extend(BarChartAsComponent)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.mark-text.role-axis-title text').textContent).to.equal('a')
  })
})
