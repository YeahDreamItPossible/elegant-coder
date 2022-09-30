import AbstractMethodError from '../share/AbstractMethodError'

class IVavle {
  has (key) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override')
  }

  get (key) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override')
  }

  set (key, val) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override')
  }

  delete (key) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override')
  }

  clear () {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override')
  }
}

export default IVavle
