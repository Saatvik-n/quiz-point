import * as React from 'react';
import { CurrentQuestion, questionTypes } from '../../../Types/QuizInterface';
import CreateMultipleChoice from './CreateMultipleChoice';
import CreateSingleQuestion from './CreateSingleQuestion';
import CreateFlashcard from "./CreateFlashcard"

export interface CreateQuestionHelperProps {
  questionType: questionTypes;
}
 
const CreateQuestionHelper: React.FC<CreateQuestionHelperProps> = (props) => {
  const {questionType} = props 

  if (questionType === "Single Option") {
    return (
      <CreateSingleQuestion   />
    )
  }

  else if (questionType === "Multiple Choice") {
    return (
      <CreateMultipleChoice />
    )
  }

  return (
    <CreateFlashcard />
  )
}
 
export default CreateQuestionHelper;