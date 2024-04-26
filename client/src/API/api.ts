export default {
    baseUrl: import.meta.env.VITE_API_URL,

    get: async function (url: string) {
        return fetch(this.baseUrl + url, { method: "GET" }).then(response => response.json())
    },
    post: async function (url: string, body: any) {
        return fetch(this.baseUrl + url, {
            method: "POST", body: JSON.stringify(body), headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json());
    },
    put: async function (url: string, body: any) {
        return fetch(this.baseUrl + url, {
            method: "POST", body: JSON.stringify(body), headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
    },
    delete: async function (url: string) {
        return fetch(this.baseUrl + url, { method: "DELETE" }).then(response => response.json())
    },
    patch: async function (url: string) {
        return fetch(this.baseUrl + url, { method: "PATCH" }).then(response => response.json())
    }
}