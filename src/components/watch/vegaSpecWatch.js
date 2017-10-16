import { changeset } from 'vega'

export default {
  handler (nextSpec) {
    let isVegaViewAlreadyCreated = this.$vg
    let didVueComponentMounted = this.$el

    if (isVegaViewAlreadyCreated) {
      this.destroyVegaView(this.$vg)
    }

    this.$vg = this.createVegaView(nextSpec)

    if (didVueComponentMounted) {
      this.mountVegaView(this.$vg, this.$el)
      this.addSignalEmitter(this.$vg, this.vegaSpec, this)
      this.streamDataToVegaView(
        this.$vg,
        this.data,
        null,
        this.vegaSpec,
        changeset
      )
    }
  },
  deep: true
}

