class InterceptorOption {
  constructor () {
    this.name = undefined
    this.stage = undefined
    this.fn = _ => _
  }
}

class Interceptor {
  constructor () {
    this.queue = []
  }

  // NOTE: 尽量不要使用匿名函数
  use (options) {
    let item
    if (typeof options === 'function') {
      item = {
        name: options.name,
        fn: options
      }
    }
    else if (typeof options === 'object' && options !== null) {
      if (typeof options.fn == 'function') {
        item = { ...options }
      }
    }

    // 优先队列
    if (typeof item === 'object') {
      // if (item.stage) {
      //   let queue = this.queue.slice()
      //   let index = -1
      //   queue.forEach((item, index) => {
      //   })
      // }
      // else {
      // }
      this.queue.push(item)
    }

    return this
  }

  // 优先队列

}

export default Interceptor
