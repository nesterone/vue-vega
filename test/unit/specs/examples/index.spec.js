import Vue from 'vue'
import ReuseSpecsComponentExample from 'examples/ReuseSpecsComponentExample'
import UpdateDataExample from 'examples/UpdateDataExample'
import VueVega from 'src/index'

describe('Examples', () => {
  let LocalVue = Vue
  // TODO: in 'Provide scoped vue instance for testing plugin #16'
  LocalVue.use(VueVega)

  function getAxisText (vm) {
    return vm.$el.querySelector('.mark-text.role-axis-title text').textContent
  }

  it('runs sanity check for `vega components`', () => {
    const Constructor = LocalVue.extend(ReuseSpecsComponentExample)
    const vm = new Constructor().$mount()

    expect(getAxisText(vm)).to.equal('a')
  })

  it('runs sanity check for `update data`', () => {
    const Constructor = LocalVue.extend(UpdateDataExample)
    const vm = new Constructor().$mount()

    expect(getAxisText(vm)).to.equal('val (binned)')
  })
})
