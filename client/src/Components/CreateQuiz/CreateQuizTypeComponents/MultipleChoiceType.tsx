import { Checkbox } from '@chakra-ui/checkbox';
import { DeleteIcon } from '@chakra-ui/icons';
import { Input } from '@chakra-ui/input';
import { HStack } from '@chakra-ui/layout';
import * as React from 'react';

export interface MultipleChoiceTypeProps {
  
}
 
const MultipleChoiceType: React.FC<MultipleChoiceTypeProps> = () => {
  return (  
    <> 
      <HStack marginBottom={4} width="95%" >
      <Checkbox />
      <Input type="text" />
      <DeleteIcon />
      </HStack>
    </>
  );
}
 
export default MultipleChoiceType;