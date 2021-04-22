export interface singleOption {
  answerText: string;
  isCorrect: boolean;
}

export type questionTypes = "Single Option" | "Multiple Option" | "Flashcard" 

/**
 * Each question we read from somewhere (reading from API or sample quiz) 
 * will have this format
 */
export interface singleQuestion {
  questionText: string;
  answerOptions?: Array<singleOption>;
  flashcardAnswerText?: string;
  type: questionTypes
}

export type CurrentQuestion = {
  singleOption: singleQuestion;
  multipleChoice: singleQuestion;
  flashcardText: singleQuestion;
}

/**
 * this is the actual data contained in the quiz
 */
export type QuizData = Array<singleQuestion>



/**
 * This is used to keep track of the questions while creating a quiz.
 * Questions are an array of possible types (single, multiple, flashcard), so when we have to finish 
 * creating the quiz, then we need to construct the JSON file for the quiz. To do that, other information 
 * is needed apart from those types:
 * Question Text
 * Question Type - this is decided by the last button you have pressed. Each quiz question has 3 fields (single, multiple, flash)
 * When you press finish creating quiz, the data in that type is taken and used to create the JSON File 
 */

export type quizTypeState = Array<{
  questionText: string,
  questionType: questionTypes
}>

/**
 * This is the current data in the question. This allows user to go back, and switch between types of questions 
 */

export type CurrentQuizData = Array<CurrentQuestion>

/* This is to keep track of the quiz answers that you have given 
 Array<boolean> - for single and Multiple Option questions
string - for flashcard based questions
*/
export type AnswerArray = Array<Array<boolean> | string> 
/**
 * This is used to store objects to display when user wants to see their entered options. Fields:
 * questionText - self explanatory 
 * isCorrect - for option based questions, compare and return a result. For flashcard questions - use the user's provided input
 * yourAnswer, givenAnswer - string for flashcard, Single Option. string[] WOULD BE USED for Multiple Option, 
 * but all the options are concatenated into a single string
 */
export interface quizQADatarow {
  questionText: string;
  isCorrect: boolean;
  yourAnswer: string;
  givenAnswer: string;
}

// Initial object for result 
export const initQADataRowObject:quizQADatarow = {
  questionText: "", 
  isCorrect: false, 
  yourAnswer: "", 
  givenAnswer: ""
}

export type validateError= "multipleError" | "flashError" | "none"