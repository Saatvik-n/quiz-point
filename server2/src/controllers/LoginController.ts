import { IncomingMessage, ServerResponse } from "node:http";
import { promiseReadGenerator } from "../util/HttpUtil.js";

export async function loginUser(request: IncomingMessage, response: ServerResponse) {
    try {
        console.log("Request recieved to login user");
        const body: any[] = []

        const promiseRead: Promise<string> = promiseReadGenerator(request, body)

        const requestBody: string = await promiseRead
        console.log(`Request body is: \n ${requestBody}`);

        response.statusCode = 200
        response.write("Yo")
        response.end()
        return

    } catch (error) {
        if (error instanceof Error) {
            console.log("Error logging user in");
            console.log(error.message);
            response.statusCode = 500
            response.write("Yo")
            response.end("Error logging user in")
        }
    }
}