export default {
  created () {
    this.$vg = this.createVegaView(this.vegaSpec)
  },

  mounted () {
    this.mountVegaView(this.$vg, this.$el)
  },

  beforeDestroy () {
    this.destroyVegaView(this.$vg)
  }
}

