import { message } from 'antd'

export default class Service {
  static async get(url: string, query: any = {}) {
    if (query) {
      url += '?'
      for (let key in query) {
        url += `${key}=${query[key]}&`
      }
    }
    return fetch(url)
      .catch((error) => {
        message.warn(error)
      })
      .then((res: any) => {
        return res.json()
      })
  }
}
