import { IncomingMessage, ServerResponse } from "node:http";

export type HttpMethod = (request: IncomingMessage, response: ServerResponse) => boolean

export type RouteObject = {
    routeHandler: HttpMethod
}

export type RouteType = Record<string, RouteObject>