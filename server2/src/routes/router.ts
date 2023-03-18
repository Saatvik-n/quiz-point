import { IncomingMessage, ServerResponse } from "node:http";
import { HttpMethod, RouteType } from "../types/routeTypes.js";
import { handleLoginRoute } from "./login.js";

function homeRoute(request: IncomingMessage, response: ServerResponse) {
    response.write("Hi")
    response.end()
    return true
}

function routeNotFound(request: IncomingMessage, response: ServerResponse) {
    response.statusCode = 404
    response.write("Not Found")
    response.end()
    return true
}


const routes: RouteType = {
    "/api/login": {
        routeHandler: handleLoginRoute
    },
    "/api/logout": {
        routeHandler: routeNotFound
    },
    "/": {
        routeHandler: homeRoute
    }
}


export function router(request: IncomingMessage, response: ServerResponse) {
    console.log(`Request recieved at ${request.url}`);
    let routeHandlerFunction: undefined | HttpMethod = undefined
    for (const uri in routes) {
        if (request.url !== undefined && request.url.startsWith(uri)) {
            routeHandlerFunction = routes[uri].routeHandler
            break
        }
    }
    if (routeHandlerFunction === undefined) {
        routeNotFound(request, response)
        return
    }
    const handled = routeHandlerFunction(request, response)
    if (!handled) {
        routeNotFound(request, response)
    }
    return
}