import React, { createContext } from "react";
import cloneDeep from "clone-deep"
import {
  CurrentQuestion,
  questionTypes,
  singleQuestion,
} from "../Types/QuizTypes";
import {
  clearAllOptions,
  handleMultipleChoiceClick,
} from "../Util/QuizUtilFunctions";

type currentQuestionType = {
  singleOption: singleQuestion;
  multipleChoice: singleQuestion;
  flashcardText: singleQuestion;
};
/**

 */
type changeQuestionStateAction =
  | {
      type: "add"; // This action is applicable for both the option types (single choice, multiple choice), and adds an option
      field: questionTypes;
    }
  | {
      type: "changeTextChoice"; // This action is applicable for both of the option types, it changes the text of the option specified by index
      field: questionTypes;
      index: number;
      payload: string;
    }
  | {
      type: "changeCorrectAns"; // This action is applicable only to single choice question, it changes the correct answer
      index: number;
    }
  | {
      type: "delete";
      field: questionTypes;
      index: number;
    }
  | {
      type: "changeMultipleAns";
      index: number;
    }
  | {
      type: "changeFlashcardText";
      payload: string;
    }
  |
    { 
      type: "changeQuestion"; // This is for when we want to change a question. The new question values will be provided 
      payload: currentQuestionType;
    }

export const initialQuestionState: CurrentQuestion = {
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

export const changeQuestionStateReducer = (
  state: CurrentQuestion,
  action: changeQuestionStateAction
) => {
  switch (action.type) {
    case "add": {
      switch (action.field) {
        case "Single Option":
          const curAnswerOptions = [...state.singleOption.answerOptions!];
          curAnswerOptions.push({ answerText: "", isCorrect: false });


          return {
            ...state,
            singleOption: {
              ...state.singleOption,
              answerOptions: curAnswerOptions,
            },
          };
        case "Multiple Option": {
          const curAnswerOptions = [...state.multipleChoice.answerOptions!];
          curAnswerOptions.push({ answerText: "", isCorrect: false });
          return {
            ...state,
            multipleChoice: {
              ...state.multipleChoice,
              answerOptions: curAnswerOptions,
            },
          };
        }

        default:
          return {
            ...state,
          };
      }
    }
    case "changeTextChoice": {
      switch (action.field) {
        case "Single Option": {
          
          const curAnswerOptions = [...state.singleOption.answerOptions!];
          curAnswerOptions[action.index].answerText = action.payload;


          return {
            ...state,
            singleOption: {
              ...state.singleOption,
              answerOptions: curAnswerOptions,
            },
          };
        }
        case "Multiple Option": {
          const curAnswerOptions = [...state.multipleChoice.answerOptions!];
          curAnswerOptions[action.index].answerText = action.payload;

          return {
            ...state,
            multipleChoice: {
              ...state.multipleChoice,
              answerOptions: curAnswerOptions,
            },
          };
        }
        default:
          return {
            ...state,
          };
      }
    }
    case "changeCorrectAns": {
      const curAnswerOptions = [...state.singleOption.answerOptions!];
      const newAnswerOptions = clearAllOptions(curAnswerOptions);
      newAnswerOptions[action.index].isCorrect = true;
      return {
        ...state,
        singleOption: {
          ...state.singleOption,
          answerOptions: newAnswerOptions,
        },
      };
    }
    case "delete": {
      switch (action.field) {
        case "Single Option": {
          const curAnswerOptions = [...state.singleOption.answerOptions!];
          curAnswerOptions.splice(action.index, 1);
          return {
            ...state,
            singleOption: {
              ...state.singleOption,
              answerOptions: curAnswerOptions,
            },
          };
        }

        case "Multiple Option": {
          const curAnswerOptions = [...state.multipleChoice.answerOptions!];
          curAnswerOptions.splice(action.index, 1);
          return {
            ...state,
            multipleChoice: {
              ...state.multipleChoice,
              answerOptions: curAnswerOptions,
            },
          }; 
        }

        default:
          return {
            ...state
          }
      }
    }
    case "changeMultipleAns": {
      const curAnswerOptions = [...state.multipleChoice.answerOptions!];
      const newAnswerQuestions = handleMultipleChoiceClick(
        curAnswerOptions,
        action.index
      );

      return {
        ...state,
        multipleChoice: {
          ...state.multipleChoice,
          answerOptions: newAnswerQuestions,
        },
      };
    }
    case "changeFlashcardText": {
      const newFlashcardText = action.payload;
      return {
        ...state,
        flashcardText: {
          ...state.flashcardText,
          flashcardAnswerText: newFlashcardText,
        },
      };
    }
    case "changeQuestion": {
      return {
        ...action.payload
      }
    }
    default:
      break;
  }
  return state;
};

export interface CurrentQuizQuestionContextProps {
  currentQuestionState: currentQuestionType;
  currentQuestionDispatch: React.Dispatch<changeQuestionStateAction>;
}

const CurrentQuizQuestionContext = createContext<CurrentQuizQuestionContextProps>({
  currentQuestionState: initialQuestionState,
  currentQuestionDispatch: () => {},
});

export const CurrentQuizQuestionContextProvider = CurrentQuizQuestionContext.Provider;
export const CurrentQuizQuestionContextConsumer = CurrentQuizQuestionContext.Consumer;

export default CurrentQuizQuestionContext;
