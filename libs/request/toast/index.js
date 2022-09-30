import Taro from '@tarojs/taro'

import { TOAST } from '@/network/request/share/const.js'
import { noop } from '@/network/request/share/index.js'

class ToastManager {
  constructor (options) {
    this.options = options
  }

  static DURATION_TIME = TOAST.DURATION_TIME

  _mergeOptions (options) {
    return ({
      title: options.title || TOAST.SUCCESS_TEXT,
      mask: options.mask || false,
      icon: options.icon || 'none',
      duration: options.duration || this.constructor.DURATION_TIME,
      success: typeof options.success === 'function' ? options.success : noop,
      fail: typeof options.fail === 'function' ? options.fail : noop,
    })
  }

  show (config) {
    if (typeof config === 'string') {
      config = {title: config}
    }
    if (typeof config === 'undefined') {
      config = {}
    }

    if (typeof config !== 'object') {
      console.error('[MPLog]: ' + '调用Toast show方法时参数错误')
      config = {}
    }

    const options = this._mergeOptions(config)
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

const sington = new ToastManager()

export default sington
