import { VStack } from "@chakra-ui/layout";
import React, { useContext } from "react";
import SingleOptionType from "../../../Components/CreateQuiz/CreateQuizTypeComponents/SingleOptionType";
import CurrentQuizQuestionContext from "../../../Contexts/CurrentQuizQuestionContext";
import { CurrentQuestion } from "../../../Types/QuizInterface";

export interface SingleQuestionProps {
  openModal: (m: string) => void;
}

const SingleQuestion: React.FC<SingleQuestionProps> = (props) => {
  const { currentQuestionState, currentQuestionDispatch } = useContext(
    CurrentQuizQuestionContext
  );

  const {openModal} = props 

  const changeOptionText = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    currentQuestionDispatch({
      type: "changeTextChoice",
      field: "Single Option",
      index: index,
      payload: e.target.value,
    });
  };

  const changeOption = (index: number) => {
    currentQuestionDispatch({
      type:"changeCorrectAns", 
      index: index
    })
  };

  const deleteOption = (index:number) => {
    currentQuestionDispatch({
      type: "delete", 
      field: "Single Option",
      index: index
    })
  }

  return (
    <>
      {/* Box is used here, because the elements should be aligned on the left, 
    If VStack was used, then they would be aligned in the center */}
    {/**
     * TODO - remove SingleOptionType Component, declare it locally
     */}
      <VStack marginTop={6} width="100%">
        {currentQuestionState.singleOption.answerOptions!.map(
          (option, index) => {
            return (
              <SingleOptionType
              openModal={openModal}
                optionText={option.answerText}
                handleTextChange={changeOptionText}
                index={index}
                isCorrect={option.isCorrect}
                changeOption={changeOption}
                deleteOption={deleteOption}
              />
            );
          }
        )}
      </VStack>
    </>
  );
};

export default SingleQuestion;
