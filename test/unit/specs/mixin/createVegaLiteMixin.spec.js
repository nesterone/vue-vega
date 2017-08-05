import * as vegaUtil from 'vega-util'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin';

describe('createVegaLiteMixin', () => {
  let vegaLiteMixin
  let vueOptionSpec
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    vueOptionSpec = {
      isVegaLiteCompatible: sandbox.stub()
    }
    vegaLiteMixin = createVegaLiteMixin({
      vueOptionSpec: vueOptionSpec
    })
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('beforeCreate', () => {
    let $options
    let context

    beforeEach(() => {
      $options = {
        data () {
          return {values: [1, 2, 3]}
        }
      }
      context = {
        $options
      }
    })

    it('should check vue component options for vega spec properties', () => {
      vegaLiteMixin.beforeCreate.call(context)

      expect(vueOptionSpec.isVegaLiteCompatible).to.have.been.calledWith(context.$options)
    })

    it('should create vega spec object from options', () => {
      context = {
        $options: Object.assign({encoding: {}, mark: 'blabla'}, $options)
      }
      vueOptionSpec.isVegaLiteCompatible.returns(true)

      vegaLiteMixin.beforeCreate.call(context)

      expect(context.$spec).to.deep.equal({
        '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
        data: {
          values: [1, 2, 3]
        },
        mark: 'blabla',
        encoding: {}
      })
    })

    it('should\'t create $spec because no vega options', () => {
      vueOptionSpec.isVegaLiteCompatible.returns(false)

      vegaLiteMixin.beforeCreate.call(context)

      expect(context.$spec).to.be.undefined
    })
  })

  describe('created', () => {
    let View
    let view
    let parse
    let compile
    let spec
    let context
    let compilerOutput
    let runtime
    let logLevel = vegaUtil.Debug

    beforeEach(() => {
      spec = {
        data: {
          values: [
            {a: 'A', b: 28}, {a: 'B', b: 55}, {a: 'C', b: 43},
            {a: 'D', b: 91}, {a: 'E', b: 81}, {a: 'F', b: 53},
            {a: 'G', b: 19}, {a: 'H', b: 87}, {a: 'I', b: 52}
          ]
        },
        mark: 'bar',
        encoding: {
          x: {field: 'a', type: 'ordinal'},
          y: {field: 'b', type: 'quantitative'}
        }
      }
      context = {
        description: 'description',
        $spec: spec
      }
      compilerOutput = {
        spec: 'vegaSpecFromVegaLite'
      }
      runtime = 'runtime'

      View = sandbox.stub()
      parse = sandbox.stub()
      compile = sandbox.stub()

      view = {
        logLevel: sandbox.stub(),
        renderer: sandbox.stub(),
        hover: sandbox.stub()
      }

      view.logLevel.withArgs(logLevel).returns(view)
      view.renderer.withArgs('svg').returns(view)
      view.hover.returns(view)

      compile.withArgs(context.$spec).returns(compilerOutput)
      parse.withArgs(compilerOutput.spec).returns(runtime)
      View.withArgs(runtime).returns(view)

      vegaLiteMixin = createVegaLiteMixin({
        compile,
        parse,
        View,
        logLevel
      })
    })

    it('should add description to spec', () => {
      vegaLiteMixin.created.call(context)

      expect(context.$spec.description).to.equal(context.description)
    })

    it('should compile spec from context and pass it to parser', () => {
      vegaLiteMixin.created.call(context)

      expect(parse).to.have.been.calledWith(compilerOutput.spec)
    })

    it('should parse spec and create View within generated runtime', () => {
      vegaLiteMixin.created.call(context)

      expect(View).to.have.been.calledWith(runtime)
    })

    it('should create View instance as $vg in a context', () => {
      vegaLiteMixin.created.call(context)

      expect(context.$vg).to.equal(view)
    })

    it('should set proper log level, renderer and enable hover', () => {
      vegaLiteMixin.created.call(context)

      expect(view.logLevel).to.have.been.calledWith(logLevel)
      expect(view.renderer).to.have.been.calledWith('svg')
      expect(view.hover).to.have.been.called
    })

    it('should\'t create $vg if $spec is undefined', () => {
      let context = {}

      vegaLiteMixin.created.call(context)

      expect(context.$vg).to.be.undefined
    })
  })

  describe('mounted', () => {
    it('should initialize view within dom elem of component and run', () => {
      let view = {
        initialize: sandbox.stub(),
        run: sandbox.stub()
      }
      let context = {
        $vg: view,
        $el: 'el'
      }

      view.initialize.returns(view)
      view.run.returns(view)

      vegaLiteMixin.mounted.call(context)

      expect(view.initialize).to.have.been.calledWith(context.$el)
      expect(view.run).to.have.been.called
    })

    it('should\'t fail if $vg undefined', () => {
      let context = {}

      vegaLiteMixin.mounted.call(context)
    })
  })

  describe('destroyed', () => {
    it('should finalize view', () => {
      let view = {
        finalize: sandbox.stub()
      }
      let context = {
        $vg: view
      }

      vegaLiteMixin.beforeDestroy.call(context)

      expect(view.finalize).to.have.been.called
    })

    it('should\'t fail if $vg undefined', () => {
      let context = {}

      vegaLiteMixin.beforeDestroy.call(context)
    })
  })
})
