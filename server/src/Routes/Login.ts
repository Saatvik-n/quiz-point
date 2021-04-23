import { Router } from "express";
import { loginUser, logoutUser } from "../Controllers/UserController";

const app = Router()

app.post('/api/login', loginUser)

app.get('/api/logout', logoutUser)

export default app;