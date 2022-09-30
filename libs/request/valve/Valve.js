import IValve from './IValve'

class Valve extends IValve {
  constructor () {
    super()
    this.cache = new Map()
  }

  has (key) {
    return this.cache.has(key)
  }

  get (key) {
    if (!this.cache.has(key)) {
      return
    }
    return this.cache.get(key)
  }

  set (key, val) {
    try {
      this.cache.set(key, val)
    } catch (e) {
      console.error('[MPLog]: UpexpectedUpdateError: ' + `the error happens when set the key '[${key}]' to value` + ' in the Valve')
    }
    return this
  }

  delete (key) {
    if (!this.cache.has(key)) {
      return true
    }
    try {
      this.cache.delete(key)
      return true
    } catch (e) {
      console.error('[MPLog]: UnpectedDeleteError: ' + `unpected the key of ${key} is exit but not `, 'in the Valve')
      return false
    }
  }

  clear () {
    this.cache.clear()
  }
}

export default Valve
