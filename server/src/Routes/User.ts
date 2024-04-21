import { Router } from "express";
import { getUserQuizzes, validateNext } from "../Controllers/UserController.js";
import { onlyValidateJWT, validateJWT } from "../Helpers/JWTHelper.js";

const app = Router()

app.get('/api/user/:userID', onlyValidateJWT, getUserQuizzes)

app.get('/api/validate', validateJWT)

export default app;