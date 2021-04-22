import { Router } from "express";
import { loginUser } from "../Controllers/UserController";

const app = Router()

app.post('/api/login', loginUser)

export default app;