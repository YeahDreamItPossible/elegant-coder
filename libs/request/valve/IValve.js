import AbstractMethodError from '../share/AbstractMethodError'

class IVavle {
  has (key) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + 'in the IValve')
  }

  get (key) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + 'in the IValve')
  }

  set (key, val) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + 'in the IValve')
  }

  delete (key) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + 'in the IValve')
  }

  clear () {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + 'in the IValve')
  }
}

export default IVavle
