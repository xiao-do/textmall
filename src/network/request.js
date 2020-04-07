import axios from 'axios'

export function request(config){
  const instance = axios.create({
    // 1.创建axios实例
    baseURL:"http://152.136.185.210:8000/api/h8",
    timeout:10000
  })

  // 2.axios拦截器
  // （1）这个是请求成功和请求失败
  instance.interceptors.request.use(config => {
    return config
  },err =>{
    console.log(err);
  })
  // (2)相应成功和相应失败
  instance.interceptors.response.use(res => {
    return res.data
  },err => {
    console.log(err);
  })
  //3. 这里是发送真正的网络请求
  return instance(config)
}

