import AbstractMethodError from '../share/AbstractMethodError'

class IToast {
  show () {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + 'in the IToast')
  }

  hide () {
    throw new AbstractMethodError('[MPLog]: AbstractMethodError: ' + 'abstract method must be override' + 'in the IToast')
  }
}

export default IToast