import { IncomingMessage, ServerResponse } from "node:http";

export async function routeNotFound(request: IncomingMessage, response: ServerResponse) {
    response.statusCode = 404
    response.write("Not Found")
    response.end()
    return true
}