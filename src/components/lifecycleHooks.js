import {changeset} from 'vega'

export default {
  created () {
    this.$vg = this.createVegaView(this.vegaSpec)
  },

  mounted () {
    this.mountVegaView(this.$vg, this.$el)
    this.streamDataToVegaView(
      this.$vg,
      this.data,
      null,
      this.vegaSpec,
      changeset
    )
  },

  beforeDestroy () {
    this.destroyVegaView(this.$vg)
  }
}

