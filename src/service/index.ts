import { message } from "antd"
import axios from "axios"
export default class Service {
  static async get(url: string, query: any = {}) {
    if (query) {
      url += '?'
      for (let key in query) {
        url += `${key}=${query[key]}&`
      }
    }
    return axios.get(url).catch((error) => {
      message.warn(error)
    })
  }
}
