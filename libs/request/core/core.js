import Taro from '@tarojs/taro'

import Interceptor from './interceptor'

// 拦截器
Taro.addInterceptor((chain) => {
  console.log('Taro Interceptor')
})

const request = (options) => {
  return new Promise((resolve, reject) => {
    Taro.request(({
      ...options,
      success (res) {
        options.success && options.success(res)
        resolve(res)
      },
      fail (err) {
        options.fail && options.fail(err)
        reject(err)
      }
    }))
  })
}

export default request
