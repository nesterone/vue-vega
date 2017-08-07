import * as vegaUtil from 'vega-util'
import createVegaLiteMixin from 'src/mixin/createVegaLiteMixin';

describe('createVegaLiteMixin', () => {
  let vegaLiteMixin
  let vueVegaOptionHelper
  const sandbox = sinon.sandbox.create()

  beforeEach(() => {
    vueVegaOptionHelper = {
      getVegaSpec: sandbox.stub(),
      shouldCreateVegaSpec: sandbox.stub()
    }
    vegaLiteMixin = createVegaLiteMixin({
      vueVegaOptionHelper
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

    it('should check for vega spec', () => {
      vegaLiteMixin.beforeCreate.call(context)

      expect(vueVegaOptionHelper.shouldCreateVegaSpec).to.have.been.calledWith(context.$options)
    })

    it('should get spec object from options', () => {
      vueVegaOptionHelper.shouldCreateVegaSpec.returns(true)

      vegaLiteMixin.beforeCreate.call(context)

      expect(vueVegaOptionHelper.getVegaSpec).to.have.been.calledWith(context.$options)
    })

    it('should create $spec from options', () => {
      const spec = {test: 'test'}
      vueVegaOptionHelper.shouldCreateVegaSpec.returns(true)
      vueVegaOptionHelper.getVegaSpec.returns(spec)

      vegaLiteMixin.beforeCreate.call(context)

      expect(context.$spec).to.equal(spec)
    })

    it('should`t create $spec because no vega options', () => {
      vueVegaOptionHelper.shouldCreateVegaSpec.returns(false)

      vegaLiteMixin.beforeCreate.call(context)

      expect(context.$spec).to.be.undefined
    })
  })

  // TODO: fix in 'Bind data updates in component with vega instance updates #7'
  xdescribe('created', () => {
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

    it('should add compiled spec to component', () => {
      vegaLiteMixin.created.call(context)

      expect(context.$compiledSpec).to.equal(compilerOutput.spec)
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

    it('should`t fail if $vg undefined', () => {
      let context = {}

      vegaLiteMixin.beforeDestroy.call(context)
    })
  })

  describe('watchers', () => {
    let vegaView
    let context
    let changeset
    let dataSetName

    beforeEach(() => {
      vegaView = {
        change: sandbox.stub(),
        run: sandbox.stub()
      }
      vegaView.change.returns(vegaView)

      dataSetName = 'testDataSet'

      context = {
        $vg: vegaView,
        $compiledSpec: {
          data: [{name: dataSetName}]
        }
      }

      changeset = sandbox.stub()
      changeset.remove = sandbox.stub().returns(changeset)
      changeset.insert = sandbox.stub().returns(changeset)
      changeset.returns(changeset)

      vegaLiteMixin = createVegaLiteMixin({changeset})
    })

    it('should change view if it was attached to component', () => {
      vegaLiteMixin.watch.data.call(context)

      expect(vegaView.change).to.have.been.called
    })

    it('should remove previous and insert next data to changeset', () => {
      const nextData = [1, 2, 3]
      const prevData = [-3, -2, -1]

      vegaLiteMixin.watch.data.call(context, nextData, prevData)

      expect(changeset.remove).to.have.been.calledWith(prevData)
      expect(changeset.remove).to.have.been.calledBefore(changeset.insert)
      expect(changeset.insert).to.have.been.calledWith(nextData)
    })

    it('should change view`s dataset and trigger re-render', () => {
      vegaLiteMixin.watch.data.call(context)

      expect(vegaView.change).to.have.been.calledWith(dataSetName, changeset)
      expect(vegaView.change).to.have.been.calledBefore(vegaView.run)
      expect(vegaView.run).to.have.been.called
    })
  })
})
