import { IncomingMessage, ServerResponse } from "node:http";
import { HttpMethod, RouteType } from "../types/routeTypes.js";
import { handleLoginRoute } from "./login.js";
import { routeNotFound } from "./notFound.js";

async function homeRoute(request: IncomingMessage, response: ServerResponse) {
    response.write("Hi")
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


export async function router(request: IncomingMessage, response: ServerResponse) {
    console.log(`Request recieved at ${request.url}`);
    let routeHandlerFunction: undefined | HttpMethod = undefined
    for (const uri in routes) {
        if (request.url !== undefined && request.url === uri) {
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