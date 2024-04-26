import Express, { NextFunction, Response, Request } from "express"
import Mongoose, { MongooseError } from "mongoose"
import Cors from "cors"
import cookieParser from "cookie-parser"
import httpErrors from "http-errors"
import Path from "path"

import loginUser from "./Routes/Login.js"
import registerUser from "./Routes/Register.js"
import userRoute from "./Routes/User.js"
import quizRoute from "./Routes/Quiz.js"
import { DB_URL, PORT } from "./Constants/Constants.js"
import morgan from "morgan"

async function main() {
    try {
        await Mongoose.connect(DB_URL);
        console.log("Successfully connected to MongoDB");

        const app = Express()
        app.use(morgan('dev'))
        app.disable('etag')
        app.use(Express.json())
        app.use(cookieParser())
        app.use(Cors({ origin: true, credentials: true }))

        app.use(Express.static(Path.join(import.meta.dirname, "..", "build")))

        app.use(loginUser)
        app.use(registerUser)
        app.use(quizRoute)
        app.use(userRoute)

        app.use((err: httpErrors.HttpError, req: Request, res: Response, next: NextFunction) => {
            console.log("There is an error");
            res.status(err.status || 500)
            return res.json({
                error: {
                    status: err.status || 500,
                    message: err.message || "There is an error"
                }
            })

        })

        app.listen(PORT, () => {
            console.log("Started listening");
        })

    } catch (error) {
        if (error instanceof MongooseError) {
            console.log('Failed to connect to mongoDB, exiting');
        } else {
            console.error(error);
            console.log("Some other error occurred, exiting");
        }
    }
}

process.on('SIGINT', async () => {
    await Mongoose.connection.close()
    console.log("Connection closed");
    process.exit(0)
})

await main();