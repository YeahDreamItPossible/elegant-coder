import taroRequest from './core'

import Interceptor from "./interceptor"

class HttpRequest {
  constructor () {
    this.interceptor = {
      request: new Interceptor(),
      response: new Interceptor()
    }
  }

  request (options) {
    let before = this.interceptor.request.slice()
    let after = this.interceptor.response.slice()

    let result = this.runInterceptors(before)

    if (typeof result !== 'undefined') {
      return result
    }

    taroRequest({ ...finalOptions }).then(res => {
      // 隐藏Loading
      if (finalOptions._showLoading) {
        loading.hide()
      }
    })
  }

  runInterceptors (interceptors, ...rest) {
    let i = 0
    let resume = true

    let res
    if (interceptors.length) {
      const next = (result) => {
        if (typeof result !== 'undefined') {
          res = result
          resume = false
        } else {
          resume = true
        }
      }

      for (let i = 0; i < interceptors.length; i++) {
        if (resume) {
          resume = false
          let result = interceptors[i].call(this, ...rest, next)
          if (typeof result !== 'undefined') {
            res = result
            break
          }
        } else {
          break
        }
      }

      return res
    }
  }
}

const instance = new HttpRequest()

export default instance
