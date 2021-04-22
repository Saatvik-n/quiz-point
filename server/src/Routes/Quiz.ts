import { Router } from "express";
import { getQuiz, createNewQuiz, deleteQuiz, replaceQuiz, checkQuiz, toggleQuizPublic } from "../Controllers/QuizController"
import { validateJWT } from "../Helpers/JWTHelper";

const app = Router()

app.get('/api/quiz/:quizID', getQuiz) // To get the quiz data

app.post('/api/quiz',  createNewQuiz ) // To create a new Quiz

app.delete('/quiz/:quizID', validateJWT,deleteQuiz) // To delete a quiz - this has no body

app.put('/api/quiz/:quizID', validateJWT,replaceQuiz) // To replace a quiz 

app.get('/api/quiz/checkvalid/:quizID', checkQuiz) // To check if the quiz is valid

app.patch('/api/quiz/togglepub/:quizID', validateJWT,toggleQuizPublic) // PATCH is used since we are modifying a resource

export default app;