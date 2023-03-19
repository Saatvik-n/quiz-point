import { IncomingMessage } from "http";

export function promiseReadGenerator(request: IncomingMessage, body: any[]) {
    return new Promise<string>((resolve, reject) => {
        request.on('data', chunk => {
            body.push(chunk)
        })

        request.on('error', error => {
            reject(new Error("Error reading request body"))
        })

        request.on('end', (_: any) => {
            resolve(body.toString())
        })
    })
}