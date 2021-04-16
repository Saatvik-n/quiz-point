import { Box, Text } from '@chakra-ui/layout';
import * as React from 'react';
import { questionTypes } from "../../../Types/QuizInterface";

export interface QuestionHeaderProps {
  questionName: string;
  questionType: questionTypes
}
 
const QuestionHeader: React.FC<QuestionHeaderProps> = (props) => {

  const {questionName, questionType} = props

  return (  
    <Box margin="10px 0px" textAlign="center" >
      <Text  fontSize="2xl" >
        {questionName}
      </Text>
      <Text fontSize="md" color="cyan.800" >
        ( {
          questionType
        } )
      </Text>
    </Box>
  );
}
 
export default QuestionHeader;