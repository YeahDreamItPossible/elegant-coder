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

  // NOTE
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
      if (item.stage) {
        let queue = this.queue.slice()
        let index = -1
        queue.forEach((option, idx) => {
          if (option.stage > item.stage) {
            index = idx
          }
        })

        if (index === -1) {
          this.queue.push(item)
        } else {
          this.queue.splice(index, 0, item)
        }
      }
      else {
        this.queue.push(item)
      }
    }

    return this
  }

  // TODO:
  // 移除拦截器
  eject (id) {
  }
}

export default Interceptor
