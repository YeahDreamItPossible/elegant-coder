import taroRequest from './core'

import Interceptor from "./interceptor"
import { isUndef, isObject } from '../share'

class HttpRequest {
  constructor () {
    this.interceptor = {
      request: new Interceptor(),
      response: new Interceptor()
    }
  }

  request (options) {
    let before = this.interceptor.request.queue.slice()

    let result = this.runInterceptors(before, {request: options})
    if (!isUndef(result)) {
      return result
    }

    return new Promise((resolve, reject) => {
      taroRequest({ ...options }).then(response => {
        let after = this.interceptor.response.queue.slice()

        let result = this.runInterceptors(after, {request: options, response})

        if (!isUndef(result)) {
          result.then(res => {
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        } else {
          resolve(response)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  beforeEach () {
  }

  afterEach () {
  }

  // TODO:
  // 该功能建议对用户使用隐藏
  runInterceptors (interceptors, payload) {
    let index = 0
    let resume = true

    let res
    if (interceptors.length) {
      const next = (result) => {
        if (resume) {
          index += 1
          if (isObject(result)) {
            runInterceptor({request: result.request || payload.request, response: result.response || payload.response || null}, next)
          } else {
            runInterceptor(payload, next)
          }
        }
      }

      const runInterceptor = (payload, next) => {
        if (resume) {
          let interceptor = interceptors[index] || null
          if (interceptor && interceptor.fn) {
            let result = interceptor.fn.call(this, payload, next)
            if (!isUndef(result)) {
              resume = false
              // TODO:
              if (result instanceof Promise) {
                res = result
              } else {
                return Promise.reject(result)
              }
            } else {
              if (!res) {
                resume = true
              } else {
                resume = false
                return res
              }
            }
          }
        }
      }

      if (res) return res
      return runInterceptor(payload, next)
    }

    return res
  }
}

const instance = new HttpRequest()

// export default instance
export default taroRequest

export { instance }
