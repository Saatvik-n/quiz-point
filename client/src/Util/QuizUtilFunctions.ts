import { CurrentQuizData, QuizData, quizTypeState, singleOption, singleQuestion, userQuizRecord } from "../Types/QuizTypes";
import cloneDeep from "clone-deep"
import { iqTemp } from "../Reducers/CurrentQuizReducer";

export const checkSingleOptionCorrect = (userAnsers: boolean[], correctAnswers: singleOption[]):boolean => {
  for (let i = 0; i < correctAnswers.length; i++) {
    // If one is true and the other is true, then the user must have clicked the correct option, since it's a radio question anyway
    if (correctAnswers[i].isCorrect === true && userAnsers[i] === true) {
      return true
    }
  }
  return false;
}

export const checkMultipleChoiceCorrect = (userAnsers: boolean[], correctAnswers: singleOption[]):boolean => {
  for (let i = 0; i < correctAnswers.length; i++) {
    // Here, if the values in either of them differ, then it means that the answer is wrong
    if (userAnsers[i] !== correctAnswers[i].isCorrect) {
      return false
    }
  }
  return true
}

/** Functions for Single Option questions */

export const findUserAnswerInSingle = (userAnswers: boolean[], answerOptions: Array<singleOption>):string => {
  for (let i = 0; i < answerOptions.length; i++) {
    if (userAnswers[i] === true) {
      return answerOptions[i].answerText
    }
  }
  return "None"
}


// This returns the index of the correct answer in a Single Option question
export const findCorrectAnswerInSingle = (answerOptions: Array<singleOption>):string => {
  for (let i = 0; i < answerOptions.length; i++) {
    const currentOption = answerOptions[i] 
    if (currentOption.isCorrect === true) {
      return currentOption.answerText
    }
  }
  return "";
}

/**
 * This function returns an object of type answerOptions (an array of single options).
 * Each option will have the same text, but every isCorrectField will be set to false
 */
export const clearAllOptions = (curAnswerOptions: singleOption[]):singleOption[] => {
  const clearedAnswerOptions:singleOption[] = curAnswerOptions.map((option) => {
    return {
      answerText: option.answerText, 
      isCorrect: false
    }
  })

  return clearedAnswerOptions
}




/** Functions for multiple option questions */

// This function returns the user's selected answer in a Multiple Option question by concatenating 
// all of the selected options into a single string
export const getUserAnswersInMultiple = (userAnswers: boolean[], answerOptions: Array<singleOption>): string => {
  let res = "";
  for (let i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === true) {
      res += answerOptions[i].answerText + " , "
    }
  }
  let tempLength = res.length
  if (res.length === 0) {
    return "None"
  }
  res = res.substring(0, tempLength - 2)
  return res;
}

// This function returns all of the correct answers in a Multiple Option question as a string 
// By concatenating all of the correct answerStrings 
export const getCorrectAnswersInMultiple = (answerOptions: Array<singleOption>): string => {
  let res = ""
  for (let i = 0; i < answerOptions.length; i++) {
    if (answerOptions[i].isCorrect === true) {
      res += answerOptions[i].answerText + " , "
    }
  }
  let tempLength = res.length
  res = res.substring(0, tempLength - 2)
  return res;
}

/**
 * When a user clicks on a MCQ button, this is called 
 */
export const handleMultipleChoiceClick = (curAnswerOptions: singleOption[], index: number): singleOption[] => {
  let newAnswerOptions:singleOption[] = []
  newAnswerOptions = curAnswerOptions.map((option, i) => {
    if (index === i) {
      return {
        isCorrect: !option.isCorrect, 
        answerText: option.answerText
      }
    }
    else {
      return option;
    }
  })
  return newAnswerOptions
}

/**
 * Check if the multiple choice question has at least one option checked as true
 */
export const checkAtLeastOneIsTrue = (curAnswerOptions: singleOption[]):boolean => {
  for (const option of curAnswerOptions) {
    if (option.isCorrect === true) {
      return true
    }
  }
  return false
}

/**
 * This function can be applied to both single and multiple choice questions
 * It returns true if all the options are not empty, else false
 */
export const checkAllOptionsFilled = (curAnswerOptions: singleOption[]): boolean => {
  for (const option of curAnswerOptions) {
    if (option.answerText.trim() === "") {
      return false
    }
  }
  return true
}
/**
 * This function creates the quiz data from the current quiz state 
 * (set of questions - with each question having 3 possible types), and questionInfo 
 * (the set of correct types and question names for each question)
 */
export const createQuizData = (currentQuizState: CurrentQuizData, questionInfo: quizTypeState):QuizData => {

  const resultingQuizData:QuizData =[]
  
  for (let i = 0; i < currentQuizState.length; i++) {
    const quizQuestion = cloneDeep(currentQuizState[i]);
    const currentQuestionInfo =  cloneDeep(questionInfo[i])
    
    let currentQuestion:singleQuestion = {
      questionText: "", 
      type: "Single Option"
    }

    currentQuestion.questionText = currentQuestionInfo.questionText
    currentQuestion.type = currentQuestionInfo.questionType

    switch (currentQuestionInfo.questionType) {
      case "Single Option": {
        currentQuestion.type = "Single Option"
        currentQuestion.answerOptions = quizQuestion.singleOption.answerOptions
        break;
      }
      case "Multiple Option": {
        currentQuestion.type = "Multiple Option"
        currentQuestion.answerOptions = quizQuestion.multipleChoice.answerOptions
        break;
      }

      case "Flashcard": {
        currentQuestion.type = "Flashcard"
        
        currentQuestion.flashcardAnswerText = quizQuestion.flashcardText.flashcardAnswerText
        break;
      }
                
      default:
        currentQuestion.type = "Flashcard"
        currentQuestion.flashcardAnswerText = "blah"
        break;
    }
    const currentQuestionClone = cloneDeep(currentQuestion)

    resultingQuizData.push(currentQuestionClone)
  }
  return resultingQuizData
}

/**
 * Functions used in UserHome - to get quizIDs, and quizNames for the date returned by 
 * /api/user/:userID
*/
export function getQuizInfo(data:userQuizRecord[]) {
  let quizIDs = []
  let quizNames = []
  let isPublicList = []
  for (let i = 0; i < data.length; i++) {
    const record = data[i];
    
    quizIDs.push(record._id)
    quizNames.push(record.quizName)
    isPublicList.push(record.isPublic)
  }
  let result = {
    quizIDs, 
    quizNames, 
    isPublicList
  } 
  return result
}

/**
 * When you fetch a question, you only get the final type of the questions, 
 * the states for the other ones are left blank. So we have to populate the other
 * states. Ex: a question type will be single option, so we need to add blank 
 * templates for the other types
 */
export function makeQuizEditable(data:QuizData):CurrentQuizData {
  let resArray:CurrentQuizData = []
  for (let i = 0; i < data.length; i++) {
    let resObject = cloneDeep(iqTemp)
    const question = data[i];
    switch (question.type) {
      case "Single Option":
        resObject.singleOption = question
        break;
      case "Multiple Option":
        resObject.multipleChoice = question
        break;
      case "Flashcard":
        resObject.flashcardText = question
        break;
      default:
        break;
    }
    resArray.push(resObject)
  }
  
  return resArray
}

/**
 * When editing a quiz, we need to get the current question info (question text, question type)
 * for each question as an array, so we can set it in useEffect
 */
export function getQuestionInfo(data:QuizData):quizTypeState {
  let res = []
  for (let i = 0; i < data.length; i++) {
    const question = data[i];
    const questionText = question.questionText
    const questionType = question.type
    let resObject = {
      questionText, 
      questionType
    }
    res.push(cloneDeep(resObject))
  }
  return res;
}