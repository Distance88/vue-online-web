import axios from 'axios'
// 创建axios
import { Message } from 'element-ui';
const service = axios.create({
  baseURL: 'http://localhost:8081/',
  timeout: 10000
})
// 设置axios请求拦截器
// 拦截器中，可以对请求进行一些统一化的操作
service.interceptors.request.use(
  config => {
    // 统一设置请求头
    if (sessionStorage.getItem('token')) {

      config.headers['token'] = sessionStorage.getItem('token');

    }
    return config
  },
)
// 设置响应拦截器
service.interceptors.response.use((response) =>{
  if(response.status === 200 && response.data && response.data.code === 401) {

    Message.error('登录失效,请重新登录！')
    setTimeout(function(){ 
      window.location.href=window.location.origin+'/login';
    },1000);
    
  }
  
  const token = response.headers['token'];

  if(token){
    sessionStorage.setItem('token',token)
  }
  return response.data;
})
// 把service导出
export default service
