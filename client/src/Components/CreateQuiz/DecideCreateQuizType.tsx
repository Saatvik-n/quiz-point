import * as React from 'react';
import SingleQuestion from '../../Containers/CreateQuiz/QuizQuestionContainer/CreateSingleQuestion';
import { questionTypes } from '../../Types/QuizInterface';

export interface DecideCreateQuizTypeProps {
  quizType: questionTypes;
}
 
const DecideCreateQuizType: React.FC<DecideCreateQuizTypeProps> = (props) => {

  const {quizType} = props 

  return (
    <SingleQuestion />
  )
}
 
export default DecideCreateQuizType;