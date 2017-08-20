import Vue from 'vue'
import ComponentAsVegaLiteSpecExample from 'examples/ComponentAsVegaLiteSpecExample'
import VegaLiteComponentExample from 'examples/VegaLiteComponentExample'
import UpdateDataExample from 'examples/UpdateDataExample'
import VueVega from 'src/index'

xdescribe('Examples', () => {
  let LocalVue = Vue
  // TODO: in 'Provide scoped vue instance for testing plugin #16'
  LocalVue.use(VueVega)

  function getAxisText (vm) {
    return vm.$el.querySelector('.mark-text.role-axis-title text').textContent
  }

  xit('runs sanity check for `components as spec`', () => {
    const Constructor = LocalVue.extend(ComponentAsVegaLiteSpecExample)
    const vm = new Constructor().$mount()

    expect(getAxisText(vm)).to.equal('a')
  })

  it('runs sanity check for `vega components`', () => {
    const Constructor = LocalVue.extend(VegaLiteComponentExample)
    const vm = new Constructor().$mount()

    expect(getAxisText(vm)).to.equal('a')
  })

  it('runs sanity check for `update data`', () => {
    const Constructor = LocalVue.extend(UpdateDataExample)
    const vm = new Constructor().$mount()

    expect(getAxisText(vm)).to.equal('BIN(val)')
  })
})
