import { HStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import * as React from "react";
import { questionTypes } from "../../../Types/QuizInterface";

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
    <HStack>
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
    </HStack>
  );

};

export default CreateQuestionType;
