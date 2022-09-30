import AbstractMethodError from '../share/AbstractMethodError'

class ILoading {
  show () {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + ' in the ILoading')
  }

  hide () {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + ' in the ILoading')
  }
}

export default ILoading
