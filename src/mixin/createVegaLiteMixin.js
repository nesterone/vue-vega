export default function createVegaLiteMixin (options) {
  const changeset = options.changeset

  return {
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
