import { singleOption } from "../Types/QuizInterface";

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

/** Functions for single option questions */

export const findUserAnswerInSingle = (userAnswers: boolean[], answerOptions: Array<singleOption>):string => {
  for (let i = 0; i < answerOptions.length; i++) {
    if (userAnswers[i] === true) {
      return answerOptions[i].answerText
    }
  }
  return "None"
}


// This returns the index of the correct answer in a single option question
export const findCorrectAnswerInSingle = (answerOptions: Array<singleOption>):string => {
  let index = 0;
  for (let i = 0; i < answerOptions.length; i++) {
    const currentOption = answerOptions[i] 
    if (currentOption.isCorrect === true) {
      return currentOption.answerText
    }
  }
  return "";
}

/** Functions for multiple option questions */

// This function returns the user's selected answer in a multiple choice question by concatenating 
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

// This function returns all of the correct answers in a multiple choice question as a string 
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