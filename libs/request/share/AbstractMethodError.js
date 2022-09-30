class AbstractMethodError extends Error {
  constructor (message) {
    super(message)
    this.name = 'AbstractMethodError'
  }
}

export default AbstractMethodError
