import Taro from '@tarojs/taro'

// 拦截器
Taro.addInterceptor((chain) => {
  const requestParams = chain.requestParams
  console.log('Taro Interceptor')
  return chain.proceed(requestParams)
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
