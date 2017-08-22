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
      }
    }
  }
}
