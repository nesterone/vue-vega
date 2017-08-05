import Vue from 'vue'
import ComponentAsVegaLiteSpecExample from 'examples/ComponentAsVegaLiteSpecExample'
import VueVega from 'src/index'

describe('Docs Examples', () => {
  let LocalVue = Vue
  // TODO: in 'Provide scoped vue instance for testing plugin #16'
  LocalVue.use(VueVega)

  it('should render correct contents', () => {
    const Constructor = LocalVue.extend(ComponentAsVegaLiteSpecExample)
    const vm = new Constructor().$mount()

    expect(vm.$el.querySelector('.mark-text.role-axis-title text').textContent).to.equal('a')
  })
})
