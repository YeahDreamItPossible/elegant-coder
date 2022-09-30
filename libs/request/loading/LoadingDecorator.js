import { LOAD } from '@/network/request/share/const.js'
import { noop } from '@/network/request/share/index.js'

// 单例模式
class LoadingDecorator {
  constructor (instance) {
    this.instance = instance
    this.timer = null
  }

  static DELAY_TIME = LOAD.HIDE_DELAY_TIME

  _mergeOptions (options) {
    return ({
      title: options.title || LOAD.LOADING,
      mask: options.mask || false,
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
      console.error('[MPLog]: ' + '调用Load show方法时参数错误')
      config = {}
    }

    const options = this._mergeOptions(config)

    return this.instance.show(options)
  }

  // 延时关闭
  hide (delay) {
    const duration = delay || this.constructor.DELAY_TIME
    return new Promise((resolve, reject) => {
      this._clearTimer(this.timer)
      this.timer = setTimeout(() => {
        this.instance.hide().then(res => resolve(res)).catch(err => reject(err))
      }, duration)
    })
  }

  _clearTimer (timer) {
    timer && clearTimeout(timer)
  }
}

export default LoadingDecorator