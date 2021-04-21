import { VStack } from '@chakra-ui/layout';
import { Radio } from '@chakra-ui/radio';
import * as React from 'react';

import { singleOption } from "../../../Types/QuizInterface";

export interface SingleOptionProps {
  answerTexts: Array<singleOption>;
  checkedArray: Array<boolean>;
  handleClick: (n: number) => void;
}
 
const SingleOption: React.FC<SingleOptionProps> = (props) => {

  const {answerTexts, checkedArray, handleClick} = props

  React.useEffect(() => {
    
    
    
    
  }, [])

  return (  
      <VStack align="flex-start" marginLeft="8px" spacing={4}>
      {
          answerTexts.map((answer, index) => {
            return (
              <Radio size="lg" key={index} value={answer.answerText} isChecked={checkedArray[index]}
              onChange={() => handleClick(index)} >
                {answer.answerText}
              </Radio>
            )
          })
        }
      </VStack>
  );
}
 
export default SingleOption;