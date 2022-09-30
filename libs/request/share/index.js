export const noop = _ => _

export const isUndef = unknonw => Object.prototype.toString.call(unknonw).slice(8, -1) === 'Undefined'

export const isObject = unknonw => Object.prototype.toString.call(unknonw).slice(8, -1) === 'Object'

