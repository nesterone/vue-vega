export default function EncodingOptionMissedError () {
  this.name = 'EncodingOptionMissedError'
  this.message = 'Can\'t build visualization without `encoding` option'
  this.stack = (new Error()).stack
}
EncodingOptionMissedError.prototype = Object.create(Error.prototype)
EncodingOptionMissedError.prototype.constructor = EncodingOptionMissedError
