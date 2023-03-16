export default {
  baseUrl: import.meta.env.VITE_API_URL,
  get: function (url: string) {
    return fetch(this.baseUrl + url, { method: "GET" }).then(response => response.json())
  },
  post: function (url: string, body: any) {
    return fetch(this.baseUrl + url, { method: "POST", body: body }).then(response => response.json())
  },
  put: function (url: string, body: any) {
    return fetch(this.baseUrl + url, { method: "POST", body: body }).then(response => response.json())
  },
  delete: function (url: string) {
    return fetch(this.baseUrl + url, { method: "DELETE" }).then(response => response.json())
  },
  patch: function (url: string) {
    return fetch(this.baseUrl + url, { method: "PATCH" }).then(response => response.json())
  }
}