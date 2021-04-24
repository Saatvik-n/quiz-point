import { Text, VStack} from "@chakra-ui/react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import * as React from "react";


export interface CreateQuizHeaderProps {
  quizName: string;
  handleQuizNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean
}

const CreateQuizHeader: React.FC<CreateQuizHeaderProps> = (props) => {

  const {quizName, handleQuizNameChange, isDisabled} = props

  return (
    <>
      <VStack >
        <Text fontSize="2xl" > Creating Quiz </Text>
        <InputGroup>
          <InputLeftAddon children="Quiz Name" />
          <Input type="text" placeholder="Name" value={quizName}
          isDisabled={isDisabled}
          onChange={(e) => handleQuizNameChange(e)} />
        </InputGroup>
      </VStack>
    </>
  );
};

export default CreateQuizHeader;
