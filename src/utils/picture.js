import axios from 'axios'
// 创建axios
const service = axios.create({
  baseURL: 'http://api.youngam.cn/',
  timeout: 10000
})
// 设置axios请求拦截器
// 拦截器中，可以对请求进行一些统一化的操作
service.interceptors.request.use(
  config => {
    // 统一设置请求头
    config.headers['token'] = '12345'
    console.log('config:', config)
    return config
  },
)
// 设置响应拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    const code = res.code
    if(code === 200 || code  ===500) {
      return res
    }else {
      return Promise.reject('请求异常！')
    }
  },
)
// 把service导出
export default service
