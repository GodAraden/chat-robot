import axios, { AxiosResponse, AxiosError } from 'axios'

axios.defaults.withCredentials = true

// 拦截 response，统一处理 Http 错误
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError<any>) => {
    return error
  }
)

export default axios
