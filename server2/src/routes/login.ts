import { IncomingMessage, ServerResponse } from "node:http";
import { Router } from "../types/routeTypes.js";

const LoginRouter: Router = {}

LoginRouter["/api/login"] = {
    method: "GET",
    routerMethod: (request: IncomingMessage, response: ServerResponse) => {
        response.write("Hit /api/login")
        response.end()
        return
    }
}


export function handleLoginRoute(request: IncomingMessage, response: ServerResponse): boolean {
    for (const route in LoginRouter) {
        const routeObject = LoginRouter[route]
        if (request.url !== undefined && request.url === route && routeObject.method === request.method) {
            routeObject.routerMethod(request, response)
            return true
        }
    }
    return false
}