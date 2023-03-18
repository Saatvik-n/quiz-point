import { IncomingMessage, ServerResponse } from "node:http";

const LoginRouter: any = {}

LoginRouter["/api/login"] = {
    method: "GET",
    f: (request: IncomingMessage, response: ServerResponse) => {
        response.write("Hit /api/login")
        return response.end()
    }
}

export function handleLoginRoute(request: IncomingMessage, response: ServerResponse): boolean {
    for (const route in LoginRouter) {
        const routeObject = LoginRouter[route]
        if (request.url !== undefined && request.url === route && routeObject.method === request.method) {
            routeObject.f(request, response)
            return true
        }
    }
    return false
}