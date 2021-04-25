import { HStack, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import * as React from "react";
import { questionTypes } from "../../../Types/QuizTypes";

export interface CreateQuestionTypeProps {
  currentQuestionType: questionTypes;
  setButtonType: (type: questionTypes) => void;
}

const CreateQuestionType: React.FC<CreateQuestionTypeProps> = (props) => {
  const types: Array<questionTypes> = [
    "Single Option",
    "Multiple Option",
    "Flashcard",
  ];

  const { currentQuestionType, setButtonType } = props;

  return (
    <Stack direction={{base:"column", md:"row"}} wrap="wrap" >
      {types.map((option) => {
        return (
          <Button
          key={option}
            colorScheme={currentQuestionType === option ? "blue" : "gray"}
            onClick={() => {
              
              setButtonType(option)}}
          >
            {option}
          </Button>
        );
      })}
    </Stack>
  );

};

export default CreateQuestionType;
