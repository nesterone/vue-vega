export default function MarkOptionMissedError () {
  this.name = 'MarkOptionMissedError'
  this.message = 'Can\'t build visualization without mark type'
  this.stack = (new Error()).stack
}
MarkOptionMissedError.prototype = Object.create(Error.prototype)
MarkOptionMissedError.prototype.constructor = MarkOptionMissedError
