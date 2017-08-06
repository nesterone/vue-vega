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

      const compile = options.compile
      const parse = options.parse
      const View = options.View
      const logLevel = options.logLevel

      if (this.description) {
        this.$spec.description = this.description;
      }
      this.$compiledSpec = compile(this.$spec).spec;

      const runtime = parse(this.$compiledSpec);
      this.$vg = new View(runtime)
        .logLevel(logLevel)
        .renderer('svg')
        .hover();
    },

    mounted () {
      if (!this.$vg) {
        return
      }

      this.$vg
        .initialize(this.$el)
        .run();
    },

    beforeDestroy () {
      if (!this.$vg) {
        return
      }

      this.$vg.finalize();
    },

    watch: {
      data: function (nextData, prevData) {
        const vegaView = this.$vg

        if (vegaView) {
          let originalDataSetName = this.$compiledSpec.data[0].name;
          const dataChangeset = changeset().remove(prevData).insert(nextData)
          vegaView.change(originalDataSetName, dataChangeset).run()
        }
      }
    }
  }
}
