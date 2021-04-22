import { Router } from "express";
import { getUserQuizzes, validateNext } from "../Controllers/UserController";
import { validateJWT } from "../Helpers/JWTHelper";

const app = Router()

app.get('/api/user/userID', validateJWT, getUserQuizzes)

app.get('/api/validate', validateJWT, validateNext)

export default app;