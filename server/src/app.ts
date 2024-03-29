import Express, { NextFunction,Response,  Request} from "express"
import Mongoose from "mongoose"
import Cors from "cors"
import Morgan from "morgan";
import * as dotenv from "dotenv"
import cookieParser from "cookie-parser"
import httpErrors from "http-errors"
import Path from "path"

import loginUser from "./Routes/Login"
import registerUser from "./Routes/Register"
import userRoute from "./Routes/User"
import quizRoute from "./Routes/Quiz"

dotenv.config()

const PORT = process.env.PORT || 8000 

Mongoose.connect(process.env.DB_URL!, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}).then(res => {
  console.log("Successfully connected to DBMS");
})
.catch(err => {
  console.log("Error in connecting to DBMS");
  
})


const app = Express()
app.disable('etag')
app.use(cookieParser())
app.use(Cors({origin: true, credentials: true}))
app.use(Morgan('dev'))
app.use(Express.json())

app.use(Express.static(Path.join(__dirname, "..", "build")))

app.use(loginUser)

app.use(registerUser)

app.use(quizRoute)

app.use(userRoute)

app.use((err: httpErrors.HttpError, req: Request, res: Response, next:NextFunction) => {
  console.log("There is an error");
  
  res.status(err.status || 500 )
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

process.on('SIGINT', async () => {
  await Mongoose.connection.close()
  console.log("Connection closed");
  process.exit(0)
})