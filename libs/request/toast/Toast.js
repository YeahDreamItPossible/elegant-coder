import Taro from '@tarojs/taro'

import IToast from "./IToast"

class Toast extends IToast {
  constructor (options) {
    super()
    this.options = options || {}
  }

  show (options) {
    return new Promise((resolve, reject) => {
      Taro.showToast({
        ...options,
        success (res) {
          options.success && options.success(res)
          resolve(res)
        },
        fail (err) {
          options.fail && options.fail(err)
          reject(err)
        }
      })
    })
  }

  hide (options) {
    return new Promise((resolve, reject) => {
      Taro.hideToast({
        success (res) {
          options.success && options.success(res)
          resolve(res)
        },
        fail (err) {
          options.fail && options.fail(err)
          reject(err)
        }
      })
    })
  }
}

export default Toast
