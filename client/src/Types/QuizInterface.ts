export interface singleOption {
  answerText: string;
  isCorrect: boolean;
}

export type questionTypes = "single option" | "multiple choice" | "flashcard" 


interface singleQuestion {
  questionText: string;
  answerOptions?: Array<singleOption>;
  flashcardAnswerText?: string;
  type: questionTypes
}

/**
 * this is the actual data contained in the quiz
 */
export type QuizData = Array<singleQuestion>



export interface flashcardOption {
  answerText: string;
  isCorrect: boolean;
}

/* This is to keep track of the quiz answers that you have given 
 Array<boolean> - for single and multiple choice questions
string - for flashcard based questions
*/
export type AnswerArray = Array<Array<boolean> | string> 
/**
 * This is used to store objects to display when user wants to see their entered options. Fields:
 * questionText - self explanatory 
 * isCorrect - for option based questions, compare and return a result. For flashcard questions - use the user's provided input
 * yourAnswer, givenAnswer - string for flashcard, single option. string[] WOULD BE USED for multiple choice, 
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