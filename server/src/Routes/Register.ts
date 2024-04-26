
import { Router } from "express";
import { registerUser } from "../Controllers/UserController.js";

const app = Router()

app.post('/api/register', registerUser)

export default app;