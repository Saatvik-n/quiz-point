import { VStack, HStack } from "@chakra-ui/layout";
import { Checkbox, Input } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import * as React from "react";
import CurrentQuizQuestionContext from "../../../Contexts/CurrentQuizQuestionContext";

export interface MultipleChoiceProps {}

const CreateMultipleChoice: React.FC<MultipleChoiceProps> = () => {
  const { currentQuestionState, currentQuestionDispatch } = React.useContext(
    CurrentQuizQuestionContext
  );

  const changeOptionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    
    
    currentQuestionDispatch({
      type: "changeTextChoice",
      field: "Multiple Option",
      index: index,
      payload: e.target.value,
    });
  };

  const changeOption = (
    index: number 
  ) => {
    
    currentQuestionDispatch({
      type: "changeMultipleAns", 
      index: index
    })
  }

  const deleteOption = (index: number) => {
    currentQuestionDispatch({
      type: "delete", 
      field: "Multiple Option",
      index: index
    })
  }

  return (
    <>
      <VStack marginTop={6} width="100%">
        {currentQuestionState.multipleChoice.answerOptions!.map(
          (option, index) => (
            <>
              <HStack marginBottom={4} width="95%">
                <Checkbox isChecked={option.isCorrect} onChange={() =>                   
                  changeOption(index)} />
                <Input
                  type="text"
                  value={option.answerText}
                  onChange={(e) => changeOptionText(e, index)}
                />
                <DeleteIcon
                  display={index > 1 ? "inherit" : "none"}
                  cursor="pointer"
                  onClick={() => deleteOption(index)}
                />
              </HStack>
            </>
          )
        )}
      </VStack>
    </>
  );
};

export default CreateMultipleChoice;
