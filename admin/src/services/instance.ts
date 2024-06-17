import axios from "axios"
import { message } from "antd"

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
})

function handleResponse(response: any) {
  // 2xx 范围内的状态码都会触发该函数。
  return response
}

function handleError(error: any) {
  // 超出 2xx 范围的状态码都会触发该函数。
  message.error(error?.message)
  return Promise.reject(error)
}

// 添加响应拦截器
instance.interceptors.response.use(handleResponse, handleError)

export default instance
