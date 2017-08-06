export default function createVegaLiteMixin (options) {
  const vueVegaOptionHelper = options.vueVegaOptionHelper

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

      const vegaSpec = compile(this.$spec).spec;
      const runtime = parse(vegaSpec);

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
    }
  }
}
