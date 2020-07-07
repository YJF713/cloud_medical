import axios from "axios";
const token = localStorage.getItem("token") || `null`
/**
 * 请求拦截器，可用于loading等
 */
axios.interceptors.request.use(config => {
  //全局在data里面添加token
  // data.authorization = token
  console.log(token)
  return config
}, error => {
  return Promise.reject(error)
})
