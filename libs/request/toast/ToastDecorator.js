import Toast from "./Toast"

import { TOAST } from '@/network/request/share/const.js'
import { noop } from '@/network/request/share/index.js'

class ToastDecorator {
  constructor (toast) {
    this.instance = toast || new Toast()
  }

  static DURATION_TIME = TOAST.DURATION_TIME

  _mergeOptions (options) {
    return ({
      title: options.title || TOAST.SUCCESS_TEXT,
      mask: options.mask || false,
      icon: options.icon || 'none',
      duration: options.duration || TOAST.DURATION_TIME,
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
      console.error('[MPLog]: ' + `UnexpectedArgsError: expect the arg is object but not` + ' in the ToastDecorator')
      config = {}
    }

    const options = this._mergeOptions(config)
    return this.instance.show(options)
  }

  hide (config) {
    if (typeof config === 'string') {
      config = {title: config}
    }
    if (typeof config === 'undefined') {
      config = {}
    }

    if (typeof config !== 'object') {
      console.error('[MPLog]: ' + `UnexpectedArgsError: expect the arg is object but not` + ' in the ToastDecorator')
      config = {}
    }

    return this.instance.hide(config)
  }
}

export default ToastDecorator
