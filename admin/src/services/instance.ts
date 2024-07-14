import axios, { AxiosResponse, AxiosError } from "axios"
import { Response } from "./type"
import { message } from "antd"

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
})

function handleResponse<T>(response: AxiosResponse<Response<T>>): T {
  // 2xx 范围内的状态码都会触发该函数。
  return response.data.data
}

function handleError(error: AxiosError) {
  // 超出 2xx 范围的状态码都会触发该函数。
  message.error(error?.message)
  return Promise.reject(error)
}

// 添加响应拦截器
instance.interceptors.response.use(handleResponse, handleError)

export default instance
