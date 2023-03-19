import { IncomingMessage, ServerResponse } from "node:http";

export type HttpMethod = (request: IncomingMessage, response: ServerResponse) => Promise<boolean | undefined>

export type RouteObject = {
    routeHandler: HttpMethod
}

export type RouteType = Record<string, RouteObject>

export type RouterObject = {
    method: string,
    routerMethod: (request: IncomingMessage, response: ServerResponse) => Promise<void>
}

export type Router = Record<string, RouterObject>