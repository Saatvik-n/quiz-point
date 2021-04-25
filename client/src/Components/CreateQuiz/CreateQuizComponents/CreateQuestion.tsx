import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, VStack } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/textarea";
import * as React from "react";

export interface CreateQuestionProps {
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textValue: string;
  deleteQuestion: () => void;
}

const CreateQuestion: React.FC<CreateQuestionProps> = (props) => {
  const { handleChange, textValue, deleteQuestion } = props;

  return (
    <>
      <VStack width="90%" spacing={4}>
        <Flex justify="space-between" width="100%" >
          <Box display={{base:"none", md:"initial"}} visibility="hidden" > H </Box>
          <Text fontSize="2xl">Question</Text>
          <IconButton
          display="block"
            aria-label="delete-question"
            backgroundColor="red.400"
            color="black"
            onClick={deleteQuestion}
            icon={<DeleteIcon color="white" />}
          />
        </Flex>

        <Textarea
          
          value={textValue}
          onChange={(e) => handleChange(e)}
        ></Textarea>
      </VStack>
    </>
  );
};

export default CreateQuestion;
