import axios from "axios"

const instance = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: { "X-Custom-Header": "foobar" },
})

export default instance
