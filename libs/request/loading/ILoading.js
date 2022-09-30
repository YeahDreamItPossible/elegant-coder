import AbstractMethodError from '../share/AbstractMethodError'

class ILoading {
  show (config) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override')
  }

  hide (delay) {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override')
  }
}

export default ILoading
