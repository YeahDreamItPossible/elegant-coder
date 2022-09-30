import Taro from '@tarojs/taro'

import ILoading from './ILoading'

class Loading extends ILoading {
  constructor (options) {
    super()
    this.options = options || {}
  }

  show (options) {
    return new Promise((resolve, reject) => {
      Taro.showLoading({
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

  hide () {
    return new Promise((resolve, reject) => {
      Taro.hideLoading().then(res => resolve(res)).catch(err => reject(err))
    })
  }
}

export default Loading
