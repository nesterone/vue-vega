import { changeset } from 'vega'

export default {
  handler (nextData, prevData) {
    if (this.$vg) {
      this.streamDataToVegaView(
        this.$vg,
        nextData,
        prevData,
        this.vegaSpec,
        changeset
      )
    }
  },
  deep: true
}

