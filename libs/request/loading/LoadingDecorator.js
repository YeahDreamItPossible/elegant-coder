import Loading from './Loading'

// 单例模式
class LoadingManager {
  constructor (options) {
    this.options = options
    this.instance = null
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

  // 延时关闭
  hide (delay) {
    const duration = delay || this.constructor.DELAY_TIME
    return new Promise((resolve, reject) => {
      this._clearTimer(this.timer)
      this.timer = setTimeout(() => {
        Taro.hideLoading().then(res => resolve(res)).catch(err => reject(err))
      }, duration)
    })
  }

  _clearTimer (timer) {
    timer && clearTimeout(timer)
  }
}
