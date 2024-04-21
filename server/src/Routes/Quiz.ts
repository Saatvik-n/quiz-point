import { Router } from "express";
import { getQuiz, createNewQuiz, deleteQuiz, replaceQuiz, checkQuiz, toggleQuizPublic, getQuizDetails } from "../Controllers/QuizController.js"
import { onlyValidateJWT, validateJWT } from "../Helpers/JWTHelper.js";

const app = Router()

app.get('/api/quiz/:quizID', getQuiz) // To get the quiz data

app.post('/api/quiz',  createNewQuiz ) // To create a new Quiz

app.delete('/api/quiz/:quizID', onlyValidateJWT,deleteQuiz) // To delete a quiz - this has no body

app.put('/api/quiz/:quizID', onlyValidateJWT,replaceQuiz) // To replace a quiz 

app.get('/api/quiz/checkvalid/:quizID', checkQuiz) // To check if the quiz is valid

app.patch('/api/quiz/togglepub/:quizID', onlyValidateJWT
,toggleQuizPublic) // PATCH is used since we are modifying a resource

app.get('/api/quiz/quizDetails/:quizID', onlyValidateJWT, getQuizDetails)

export default app;