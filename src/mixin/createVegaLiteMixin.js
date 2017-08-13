export default function createVegaLiteMixin (options) {
  const changeset = options.changeset

  return {
    created () {
      this.$vg = this.createVegaView(this.vegaSpec)
    },

    mounted () {
      this.mountVegaView(this.$vg, this.$el)
    },

    beforeDestroy () {
      this.destroyVegaView(this.$vg)
    },

    methods: {
      createVegaView (vegaSpec) {
        const parse = options.parse
        const logLevel = options.logLevel
        const View = options.View
        const runtime = parse(vegaSpec)

        return new View(runtime)
          .logLevel(logLevel)
          .renderer('svg')
          .hover()
      },

      mountVegaView (vegaView, $el) {
        vegaView.initialize($el).run()
      },

      destroyVegaView (vegaView) {
        vegaView.finalize()
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

      vegaSpec: {
        handler (nextSpec) {
          let isVegaViewAlreadyCreated = this.$vg
          let didVueComponentMounted = this.$el

          if (isVegaViewAlreadyCreated) {
            this.destroyVegaView(this.$vg)
          }

          this.$vg = this.createVegaView(nextSpec)

          if (didVueComponentMounted) {
            this.mountVegaView(this.$vg, this.$el)
          }
        },
        deep: true
      }
    }
  }
}
