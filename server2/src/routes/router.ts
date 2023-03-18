import { IncomingMessage, ServerResponse } from "node:http";

function homeRoute(request: IncomingMessage, response: ServerResponse) {
    response.write("Hi")
    return response.end()
}

function notFoundRouter(request: IncomingMessage, response: ServerResponse) {
    response.statusCode = 404
    response.write("Not Found")
    return response.end()
}

export function router(request: IncomingMessage, response: ServerResponse) {
    console.log(`Request recieved at ${request.url}`);
    switch (request.url) {
        case "/":
            homeRoute(request, response)
            break;
        default:
            notFoundRouter(request, response)
            break;
    }
}