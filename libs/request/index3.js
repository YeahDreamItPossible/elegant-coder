import taroRequest from './core'

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
 * _retServerResponse: 服务端响应
 * _retResponse: 整个响应(包括请求信息)
 * _repeated = true  将会开启防重复
 */

// 项目默认配置
const getBaseOptions = () => ({
  baseURL: envConfig.baseURL || '/',
  method: 'GET',
  timeout: 30 * 1000,
  complete: _ => _,
  _showLoading: true,
  _showMsg: true,
  _retServerResponse: false,
  _retResponse: false,
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

const Utils = {
  isHeaderJson (contentType) {
    return contentType.includes('application/json')
  }
}

const createRequest = baseOptions => {
  return (options) => {
    return new Promise((resolve, reject) => {
      const finalOptions = resolver(baseOptions, options)

      // 显示Loading
      if (finalOptions._showLoading) {
        loading.show()
      }

      if (valve.has(finalOptions)) {
        return Promise.reject('请勿重复请求')
      }
      valve.set(finalOptions, Date.now())

      taroRequest({ ...finalOptions }).then(res => {
        // 隐藏Loading
        if (finalOptions._showLoading) {
          loading.hide()
        }

        finalOptions.complete && finalOptions.complete()

        if (finalOptions._retResponse) {
          resolve(res)
        }
        else if (baseOptions._retServerResponse) {
          resolve(res.data)
        }
        else {
          let { data } = res
          if (res.statusCode === 200) {
            if (data.code === 0) {
              resolve(data.data)
            } else {
              // TODO: 特殊码处理
              finalOptions._showMsg && toast.show(data.message)
              reject(res.data)
            }
          } else {
            // 非正常标准码
            finalOptions._showMsg && toast.show(data.message)
            reject(res)
          }
        }
      }).catch(err => {
        // 隐藏Loading
        // if (finalOptions._showLoading) {
        //   loading.hide()
        // }

        // finalOptions.complete && finalOptions.complete()

        reject(err)
      })
    })
  }
}

const baseOptions = getBaseOptions()
const request = createRequest(baseOptions)

request.interceptor = {
  request: {},
  response: {}
}

export default request
