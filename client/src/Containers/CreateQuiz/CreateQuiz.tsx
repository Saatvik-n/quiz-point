import { Box, Center, HStack, Text, VStack } from "@chakra-ui/layout";
import React, { useEffect, useReducer, useState } from "react";
import CreateQuizHeader from "../../Components/CreateQuiz/CreateQuizComponents/CreateQuizHeader";

import { AddIcon, ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import CreateQuestion from "../../Components/CreateQuiz/CreateQuizComponents/CreateQuestion";
import CreateQuestionType from "../../Components/CreateQuiz/CreateQuizComponents/CreateQuestionType";
import {
  CurrentQuestion,
  questionTypes,
  singleOption,
} from "../../Types/QuizInterface";

import { CreateQuizContextProvider, changeQuestionStateReducer, initialQuestionState } from "../../Contexts/CreateQuizContext";

import CreateQuestionHelper from "./QuizQuestionContainer/CreateQuestionHelper";

export interface CreateQuizProps {}



const CreateQuiz: React.FC<CreateQuizProps> = () => {
  const [quizName, setQuizName] = useState("");

  const [currentQuestionType, setCurrentQuestionType] = useState<questionTypes>(
    "Single Option"
  );

  const [currentQuestionState, currentQuestionDispatch] = useReducer(changeQuestionStateReducer, initialQuestionState)

  const currentQuestionStateValues = {
    currentQuestionState, 
    currentQuestionDispatch
  }

  const handleQuizNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuizName(newVal);
  };

  const setButtonType = (type: questionTypes) => {
    setCurrentQuestionType(type);
  };



  return (
    <>
      <Box height="7rem"></Box>
      <Center>
        <Box>
          <CreateQuizHeader
            quizName={quizName}
            handleQuizNameChange={handleQuizNameChange}
          />
          <HStack
            marginTop="10px"
            width={{ base: "500px", md: "70px" }}
            padding={{ base: "4px", md: "10px" }}
            boxShadow="-1px 0px 19px 3px rgba(207,206,206,0.69)"
          >
            <ArrowBackIcon w={10} h={10} />
            <CreateQuizContextProvider value={currentQuestionStateValues} >
              <Box>
                <VStack width={{ base: "80%", lg: "600px" }}>
                  <CreateQuestion />
                  <CreateQuestionType
                    currentQuestionType={currentQuestionType}
                    setButtonType={setButtonType}
                  />
                </VStack>
                <CreateQuestionHelper
                  questionType={currentQuestionType}
                />
                <Center marginTop="20px">
                  <AddIcon w={8} h={8} cursor="pointer"
                  onClick={() => currentQuestionDispatch({
                    type:"add", 
                    field: currentQuestionType
                  })}
                  display={currentQuestionType === "Flashcard" ? "none" : "inherit"}
                  />
                </Center>
              </Box>
            </CreateQuizContextProvider>

            <ArrowForwardIcon w={10} h={10} marginRight={10}/>
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default CreateQuiz;