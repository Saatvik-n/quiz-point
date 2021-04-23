import { Router } from "express";
import { getUserQuizzes, validateNext } from "../Controllers/UserController";
import { onlyValidateJWT, validateJWT } from "../Helpers/JWTHelper";

const app = Router()

app.get('/api/user/:userID', onlyValidateJWT, getUserQuizzes)

app.get('/api/validate', validateJWT)

export default app;