import * as React from "react";
import { VStack, Text, Textarea } from "@chakra-ui/react";
import CurrentQuizQuestionContext from "../../../Contexts/CurrentQuizQuestionContext";

export interface FlashcardProps {}

const CreateFlashcard: React.FC<FlashcardProps> = () => {

  const {currentQuestionState, currentQuestionDispatch} = React.useContext(CurrentQuizQuestionContext);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    currentQuestionDispatch({
      type:"changeFlashcardText", 
      payload: e.target.value
    })
  }

  return (
    <>
      <VStack marginTop={6} width="100%" >
        <Text fontSize="20px" > Enter the answer </Text>
        <Textarea w="90%" fontSize="2xl" value={currentQuestionState.flashcardText.flashcardAnswerText}
        onChange={(e) => handleChange(e)} />
      </VStack>
    </>
  );
};

export default CreateFlashcard;
