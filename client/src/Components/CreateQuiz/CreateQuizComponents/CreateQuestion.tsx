import { Text, VStack } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import * as React from 'react';

export interface CreateQuestionProps {
  
}
 
const CreateQuestion: React.FC<CreateQuestionProps> = () => {
  return (  
    <>
      <VStack width="90%" spacing={4} >
        <Text>
          Question 
        </Text>
        <Textarea>
          
        </Textarea>
      </VStack>
    </>
  );
}
 
export default CreateQuestion;