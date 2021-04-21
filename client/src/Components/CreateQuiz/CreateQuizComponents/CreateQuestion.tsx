import { Text, VStack } from '@chakra-ui/layout';
import { Textarea } from '@chakra-ui/textarea';
import * as React from 'react';

export interface CreateQuestionProps {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textValue: string;
}
 
const CreateQuestion: React.FC<CreateQuestionProps> = (props) => {

  const {handleChange, textValue} = props

  return (  
    <>
      <VStack width="90%" spacing={4} >
        <Text fontSize="2xl" >
          Question 
        </Text>
        <Textarea value={textValue} onChange={(e) => handleChange(e)} >
          
        </Textarea>
      </VStack>
    </>
  );
}
 
export default CreateQuestion;