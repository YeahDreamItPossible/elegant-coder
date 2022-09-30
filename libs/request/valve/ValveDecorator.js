import Vue from 'vue'

import Valve from "./Valve"
import { VALVE } from '../share/const'

const obj2Str = obj => {
  let str = '';
  if (typeof obj === 'object' && obj !== null) {
    Object.keys(obj).forEach((key) => {
      str += `${key}=${obj2Str(obj[key])}`
    })
  }
  return str
}

class ValveDecorator {
  constructor (instance) {
    this.instance = instance || new Valve()
  }

  // 容量
  static MAX_CAPACITY = VALVE.MAX_CAPACITY

  has (config) {
    let key = this.serializer(config)
    return this.instance.has(key)
  }

  get (config) {
    let key = this.serializer(config)
    return this.instance.get(key)
  }

  set (config, value) {
    let key = this.serializer(config)
    if (!this.instance.has(key)) {
      this.instance.set(key, value)
    }

    // 容量检测 (异步检测)
    Vue.nextTick(() => {
      this.checkCapacity()
    })

    return this
  }

  delete (config) {
    let key = this.serializer(config)
    if (this.instance.has(key)) {
      // TODO:
      // 延迟删除 根据项目需求
      this.instance.delete(key)
    }
  }

  _keys () {
    return Object.keys(this.instance).filter(key => !this.instance.get(key))
  }

  size () {
    return this._keys()
  }

  checkCapacity () {
    const size = this.size()
    const capacity = this.constructor.MAX_CAPACITY
    if (size >= capacity) {
      console.error('[MPLog]: CapacityOverflowError: ' + 'The capacity has exceeded the maximum, please attention! in the ValveDecorator')
      // TODO:
      // 根据项目需求 自行在容量溢出时清空
      // this._keys().forEach(key => this.delete(key))
    }
  }

  serializer (config = {}) {
    if (typeof config === 'object' && config !== null) {
    } else {
      console.error('[MPLog]: SerizlizeParamsError: ' + 'the arguments is unexpected' + ' in the ValveDecorator')
      config = {}
    }

    let key = `${config.method || 'get'}:${config.url || ''}?`;
    try {
      if (config.params) {
        key += obj2Str(config.params);
      }
      if (config.data) {
        key += obj2Str(config.data);
      }
    } catch (e) {
      warn('[MPLog]: SerizlizeParamsError: ' + 'unpected error occurred when serizlize the config' + 'in the ValveDecorator')
    }
    return key
  }
}

export default ValveDecorator
