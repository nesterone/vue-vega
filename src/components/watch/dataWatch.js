import {changeset} from 'vega'

export default {
  handler (nextData, prevData) {
    const vegaView = this.$vg

    if (vegaView) {
      let originalDataSetName = this.vegaSpec.data[0].name
      const dataChangeset = changeset().remove(prevData).insert(nextData)
      vegaView.change(originalDataSetName, dataChangeset).run()
    }
  },
  deep: true
}

