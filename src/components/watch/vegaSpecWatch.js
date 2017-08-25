export default {
  handler (nextSpec) {
    // TODO: in #24 skip if only data was changes
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

