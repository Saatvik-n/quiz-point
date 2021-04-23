import { Checkbox } from '@chakra-ui/checkbox';
import { Text, VStack } from '@chakra-ui/layout';
import * as React from 'react';

import { singleOption } from "../../../Types/QuizTypes";

export interface CheckboxOptionsProps {
  answerTexts: Array<singleOption>;
  checkedArray: Array<boolean>;
  handleClick: (n: number) => void;
}
 
const CheckboxOptions: React.FC<CheckboxOptionsProps> = (props) => {

  const {answerTexts, checkedArray, handleClick} = props

  return (  
      <VStack align="flex-start" marginLeft="8px" spacing={4} >
        {
          answerTexts.map((answer, index) => {
            return (
              <Checkbox key={index} value={answer.answerText}
              isChecked={checkedArray[index]}
              onChange={() => handleClick(index)}
               >
                <Text fontSize="xl" > {answer.answerText} </Text>
              </Checkbox>
            )
          })
        }
      </VStack>
  );
}
 
export default CheckboxOptions;