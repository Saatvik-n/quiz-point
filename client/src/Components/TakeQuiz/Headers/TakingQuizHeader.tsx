import { Box, Text } from '@chakra-ui/layout';
import * as React from 'react';

export interface TakingQuizHeaderProps {
  quizName: string;
}
 
const TakingQuizHeader: React.FC<TakingQuizHeaderProps> = (props) => {

  const {quizName} = props
 
  return (  
    <Box textAlign="center" >
      <Text fontSize="20px" >
        Taking Quiz:
      </Text>
      <Text fontSize="32px" >
        {quizName}
      </Text>
    </Box>
  );
}
 
export default TakingQuizHeader;