import { Text } from '@chakra-ui/layout';
import * as React from 'react';

export interface CurrentQuestionDisplayProps {
  currentQuestion: number;
  totalQuestions: number;
}
 
const CurrentQuestionDisplay: React.FC<CurrentQuestionDisplayProps> = (props) => {

  const {currentQuestion, totalQuestions} = props

  return (  
    <>
      <Text> Current Question: {currentQuestion + 1} / {totalQuestions} </Text>

    </>
  );
}
 
export default CurrentQuestionDisplay;