export default function createVegaLiteMixin (options) {
  const vueVegaOptionHelper = options.vueVegaOptionHelper
  const changeset = options.changeset

  return {
    beforeCreate () {
      if (vueVegaOptionHelper.shouldCreateVegaSpec(this.$options)) {
        this.$spec = vueVegaOptionHelper.getVegaSpec(this.$options)
      }
    },

    created () {
      if (!this.$spec) {
        return
      }

      this._createVegaView()
    },

    mounted () {
      if (!this.$vg) {
        return
      }

      this.$vg
        .initialize(this.$el)
        .run();

      this._vegaViewMounted = true
    },

    beforeDestroy () {
      if (!this.$vg) {
        return
      }

      this.$vg.finalize();
    },

    methods: {
      _createVegaView () {
        const compile = options.compile
        const parse = options.parse
        const View = options.View
        const logLevel = options.logLevel

        if (this.description) {
          this.$spec.description = this.description;
        }
        this.$compiledSpec = compile(this.$spec).spec;

        const runtime = parse(this.$compiledSpec);

        if (this.$vg) {
          this.$vg.finalize()
        }

        this.$vg = new View(runtime)
          .logLevel(logLevel)
          .renderer('svg')
          .hover();

        if (this._vegaViewMounted) {
          this.$vg
            .initialize(this.$el)
            .run();
        }
      }
    },

    watch: {
      data (nextData, prevData) {
        const vegaView = this.$vg

        if (vegaView) {
          let originalDataSetName = this.$compiledSpec.data[0].name
          const dataChangeset = changeset().remove(prevData).insert(nextData)
          vegaView.change(originalDataSetName, dataChangeset).run()
        }
      },

      mark (nextMark, prevMark) {
        console.log('mark', arguments);

        this.$spec.mark = nextMark

        this._createVegaView()
      }
    }
  }
}
