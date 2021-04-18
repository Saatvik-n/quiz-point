import { HStack, Box } from "@chakra-ui/layout";
import { Button, ButtonGroup, useRadio, useRadioGroup } from "@chakra-ui/react";
import * as React from "react";
import { questionTypes } from "../../../Types/QuizInterface";

export interface CreateQuestionTypeProps {
  currentQuestionType: questionTypes;
  setButtonType: (type: questionTypes) => void;
}

const CreateQuestionType: React.FC<CreateQuestionTypeProps> = (props) => {
  const types: Array<questionTypes> = [
    "Single Option",
    "Multiple Choice",
    "Flashcard",
  ];

  const { currentQuestionType, setButtonType } = props;

  return (
    <HStack>
      {types.map((option) => {
        return (
          <Button
            colorScheme={currentQuestionType === option ? "green" : "gray"}
            onClick={() => setButtonType(option)}
          >
            {option}
          </Button>
        );
      })}
    </HStack>
  );

};

export default CreateQuestionType;
