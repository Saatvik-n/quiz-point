import { CurrentQuizData, QuizData, quizTypeState, singleOption, singleQuestion } from "../Types/QuizInterface";
import cloneDeep from "clone-deep"

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
// By concatenating all of the correct answerString s 
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
 * When a user clicks on a MCQ button, ew 
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