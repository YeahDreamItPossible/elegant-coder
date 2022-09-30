import ILoading from './ILoading'

class Loading extends ILoading {
  constructor (options) {
    this.options = options
  }

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
      console.error('[MPLog]: ' + 'the arguments is unexpected' + ' in the Loading')
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
  hide () {
    return new Promise((resolve, reject) => {
      Taro.hideLoading().then(res => resolve(res)).catch(err => reject(err))
    })
  }
}

export default Loading
