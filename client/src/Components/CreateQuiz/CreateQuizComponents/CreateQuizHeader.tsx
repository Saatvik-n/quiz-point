import { Box,HStack,Text, VStack} from "@chakra-ui/react";
import { Input, InputGroup, InputLeftAddon } from "@chakra-ui/input";
import * as React from "react";


export interface CreateQuizHeaderProps {
  quizName: string;
  handleQuizNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CreateQuizHeader: React.FC<CreateQuizHeaderProps> = (props) => {

  const {quizName, handleQuizNameChange} = props

  return (
    <>
      <VStack >
        <Text fontSize="2xl" > Creating Quiz </Text>
        <InputGroup>
          <InputLeftAddon children="Quiz Name" />
          <Input type="text" placeholder="Name" value={quizName}
          onChange={(e) => handleQuizNameChange(e)} />
        </InputGroup>
      </VStack>
    </>
  );
};

export default CreateQuizHeader;
