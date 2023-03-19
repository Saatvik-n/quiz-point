import { IncomingMessage, ServerResponse } from "node:http";
import { Router } from "../types/routeTypes.js";
import { loginUser } from "../controllers/LoginController.js";

const LoginRouter: Router = {}

LoginRouter["/api/login"] = {
    method: "GET",
    routerMethod: loginUser
}


export async function handleLoginRoute(request: IncomingMessage, response: ServerResponse) {
    for (const route in LoginRouter) {
        const routeObject = LoginRouter[route]
        if (request.url !== undefined && request.url === route && routeObject.method === request.method) {
            await routeObject.routerMethod(request, response)
            return true
        }
    }
    return false
}