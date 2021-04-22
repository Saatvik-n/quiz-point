import { initialQuestionState } from "../Contexts/CurrentQuizQuestionContext";
import { CurrentQuizData, CurrentQuestion } from "../Types/QuizInterface";
import cloneDeep from "clone-deep"

const initialQuestionStateCopy = cloneDeep(initialQuestionState)

export const initialQuizState: CurrentQuizData = [initialQuestionStateCopy];


type changeCurrentQuestionAction =
  | {
      /**
       * This is to move to the next questions, and may add questions to the quiz. There are 2 cases:
       * 1) currentQuestion != length of currentQuizData - then we replace the data at currentQuestion with payload
       * (this means that the user has edited a question)
       * 2)  currentQuestion == length of currentQuizData - first we replace the data at currentQuestion. Then we push initialQuestionState (a blank question)
       * onto the array, since it is a new question
       */
      // This will save data to the current question (in case of current question modification)
      // Or it will just add InitialQuestionState to the next index (in case we are adding a question)
      type: "next";
      currentQuestion: number;
      payload: CurrentQuestion;
    }
  | {
      // This is to remove questions, it is triggered by the trash icon
      type: "remove";
      currentQuestion: number;
    }
  | {
      type: "previous";
      currentQuestion: number;
      payload: CurrentQuestion;
    };

export const currentQuizReducer = (state: CurrentQuizData, action: changeCurrentQuestionAction) => {
  
  
  switch (action.type) {
    case "next": {
      
      const stateCopy = cloneDeep(state)

      stateCopy[action.currentQuestion] = action.payload;
      if (action.currentQuestion + 1 === stateCopy.length) {
        const iqTempClone = cloneDeep(iqTemp)
        
        stateCopy.push(iqTempClone);
        return stateCopy;
      } 
        return stateCopy;
    }
    case "previous": {
      const stateCopy = cloneDeep(state)

      stateCopy[action.currentQuestion] = cloneDeep(action.payload)

      return stateCopy
    }

    case "remove": {
      const stateCopy = cloneDeep(state)
      if (action.currentQuestion === 0) {
        stateCopy.shift()
      }
      else {
        stateCopy.splice(action.currentQuestion, 1)
      }
      return stateCopy
    }

    default:
      return state;
  }
}

export const iqTemp: CurrentQuestion = {
  singleOption: {
    questionText: "",
    type: "Single Option",
    answerOptions: [
      {
        answerText: "",
        isCorrect: true,
      },
      {
        answerText: "",
        isCorrect: false,
      },
    ],
  },
  multipleChoice: {
    questionText: "",
    type: "Multiple Option",
    answerOptions: [
      {
        answerText: "",
        isCorrect: false,
      },
      {
        answerText: "",
        isCorrect: false,
      },
    ],
  },
  flashcardText: {
    questionText: "",
    type: "Flashcard",
    flashcardAnswerText: "",
  },
};