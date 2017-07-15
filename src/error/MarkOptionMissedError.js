export default class MarkOptionMissedError extends Error {
  constructor (options) {
    super(options)
    this.name = 'MarkOptionMissedError'
    this.message = 'Can\'t build visualization without mark type'
  }
}
