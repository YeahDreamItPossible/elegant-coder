import { instance } from "./core"

// 加载
import loading from './loading'
// 轻提示
import toast from './toast'
// 防重复
import valve from './valve'

// 全局环境变量
import envConfig from '@/network/env'

/**
 * Request字段扩展
 * _showLoading: 静默加载 默认不显示Loading 设置为true 显示Loading
 * _showMsg: 默认全局错误提示, 设置false 表示 取消全局提示
 * _retResponse: 整个响应(包括请求信息)
 * _retServerResponse: 服务端响应
 * _repeated = true  将会开启防重复
 */

// 项目默认配置
const getBaseConf = () => ({
  _showLoading: true,
  _showMsg: true,
  _retServerResponse: false,
  _retResponse: false,
  _repeated: true
})

// 框架使用配置
const getBaseOptions = () => ({
  baseURL: envConfig.baseURL || '/',
  method: 'GET',
  timeout: 30 * 1000,
  complete: _ => _,
  ...getBaseConf()
})

// 配置合并
const resolver = (baseOptions, options) => {
  let url = options.fullUrl ? options.fullUrl : `${baseOptions.baseURL}/${options.url}`
  let headers = Object.assign({}, baseOptions.headers, options.headers || {})
  let data = options.data || {}
  let dataType = options.dataType || baseOptions.dataType || 'json'
  let complete = options.complete || baseOptions.complete

  let _showLoading = options._showLoading || baseOptions._showLoading
  let _showMsg = options._showMsg === undefined ? baseOptions._showMsg : !!options._showMsg
  let _retServerResponse = options._retServerResponse || baseOptions._retServerResponse
  let _retResponse = options._retResponse || baseOptions._retResponse

  return {
    url,
    method: (options.method && options.method.toUpperCase()) || baseOptions.method || 'GET',
    headers,
    data,
    dataType,
    complete,

    _showLoading,
    _showMsg,
    _retResponse,
    _retServerResponse,
  }
}

// 注册拦截器
instance.interceptor.request.use({
  stage: 1,
  id: 'PreventRepeat',
  fn: ({request}, next) => {
    if (request._repeated) {
      if (valve.has(request)) {
        return Promise.reject(new Error('请勿重复请求'))
      }
      valve.set(request, Date.now())
    }
    next()
  }
})

instance.interceptor.request.use(({request}, next) => {
  // 显示Loading
  if (request._showLoading) {
    loading.show()
  }
  next()
})

instance.interceptor.response.use(({request, response}, next) => {
  // 隐藏Loading
  if (request._showLoading) {
    loading.hide()
  }
  next()
})

instance.interceptor.response.use(({request, response}, next) => {
  if (request._retResponse) {
    return Promise.resolve(response)
  }
  else if (request._retServerResponse) {
    return Promise.resolve(response.data)
  }
  else {
    const {data = {} } = response
    if (data.code === 0) {
      request._showMsg && toast.show(data.message)
      return Promise.resolve(data.data)
    }
    else {
      // TODO: 特殊码处理
      request._showMsg && toast.show(data.message)
      return Promise.reject(data)
    }
  }
})

const createRequest = baseOptions => {
  return (options) => {
    return new Promise((resolve, reject) => {
      const finalOptions = resolver(baseOptions, options)
      instance.request({ ...finalOptions }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

const baseOptions = getBaseOptions()
const request = createRequest(baseOptions)

export default request
