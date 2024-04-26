import { Router } from "express";
import { loginUser, logoutUser } from "../Controllers/UserController.js";

const app = Router()

app.post('/api/login', loginUser)

app.get('/api/logout', logoutUser)

export default app;