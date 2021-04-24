import { Button } from "@chakra-ui/button";
import { ArrowLeftIcon, RepeatIcon } from "@chakra-ui/icons";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/layout";
import * as React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { AnswerArray, QuizData, singleOption } from "../../../Types/QuizTypes";
import QuizQATable from "./QuizQATable";
import QuizResultsTable from "./QuizResultsTable";

export interface QuizResultsProps {
  quizData: QuizData; // This is the complete data of the quiz
  currentAns: AnswerArray; // This holds your answers - arrays for option based questions, string otherwise
  correctFlashAns: boolean[];
}

// This function returns the total amount of questions in each category
const calcQuestions = (quizdata: QuizData) => {
  let singleOptionQs = 0;
  let multipleChoiceQs = 0;
  let flashcardQs = 0;
  for (let i = 0; i < quizdata.length; i++) {
    const quizQuestion = quizdata[i];
    if (quizQuestion.type === "Single Option") {
      singleOptionQs++;
    } else if (quizQuestion.type === "Multiple Option") {
      multipleChoiceQs++;
    } else {
      flashcardQs++;
    }
  }
  return {
    singleOptionQs,
    multipleChoiceQs,
    flashcardQs,
  };
};

const checkSingleOptionCorrect = (
  userAnsers: boolean[],
  correctAnswers: singleOption[]
): boolean => {
  for (let i = 0; i < correctAnswers.length; i++) {
    // If one is true and the other is true, then the user must have clicked the correct option, since it's a radio question anyway
    if (correctAnswers[i].isCorrect === true && userAnsers[i] === true) {
      return true;
    }
  }
  return false;
};

const checkMultipleChoiceCorrect = (
  userAnsers: boolean[],
  correctAnswers: singleOption[]
): boolean => {
  for (let i = 0; i < correctAnswers.length; i++) {
    // Here, if the values in either of them differ, then it means that the answer is wrong
    if (userAnsers[i] !== correctAnswers[i].isCorrect) {
      return false;
    }
  }
  return true;
};

const calculateCorrectAnsers = (
  quizData: QuizData,
  currentAns: AnswerArray,
  correctFlashAns: boolean[]
) => {
  let singleOptionCorrect = 0;
  let multipleChoiceCorrect = 0;
  let flashcardCorrect = 0;
  for (let i = 0; i < quizData.length; i++) {
    const currentQuestion = quizData[i];
    if (currentQuestion.type === "Single Option") {
      if (
        checkSingleOptionCorrect(
          currentAns[i] as boolean[],
          quizData[i].answerOptions!
        )
      ) {
        singleOptionCorrect++;
      }
    } else if (currentQuestion.type === "Multiple Option") {
      if (
        checkMultipleChoiceCorrect(
          currentAns[i] as boolean[],
          quizData[i].answerOptions!
        )
      ) {
        multipleChoiceCorrect++;
      }
    } else {
      if (correctFlashAns[i] === true) {
        flashcardCorrect++;
      }
    }
  }
  return {
    singleOptionCorrect,
    multipleChoiceCorrect,
    flashcardCorrect,
  };
};

/**
 *
 */
const QuizResults: React.FC<QuizResultsProps> = (props) => {
  const { quizData, correctFlashAns, currentAns } = props;

  const [questionData, setQuestionData] = useState({
    singleOptionQs: 0,
    multipleChoiceQs: 0,
    flashcardQs: 0,
  });

  const [seeDetailedResults, setSeeDetailedResults] = useState(false);

  const [correctAnswerData, setCorrectAnswerData] = useState({
    singleOptionCorrect: 0,
    multipleChoiceCorrect: 0,
    flashcardCorrect: 0,
  });

  const [loading, setLoading] = useState(true);

  const history = useHistory()

  useEffect(() => {
    const questionResult = calcQuestions(quizData);
    setQuestionData(questionResult);
    const correctAnsResult = calculateCorrectAnsers(
      quizData,
      currentAns,
      correctFlashAns
    );
    setCorrectAnswerData(correctAnsResult);

    setLoading(false);
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <Box h="7rem"></Box>
      <VStack spacing="30px">
        <Flex justify="space-between" w="650px" >
          <Text fontSize="3xl">Results</Text>
          <HStack>
          <Button rightIcon={<RepeatIcon />} onClick={() => {
            window.location.reload()
          }} > Take quiz Again </Button>
          <Button rightIcon={<ArrowLeftIcon />} 
          onClick={() => {
            history.push('/user')
          }} > Go back </Button>
          </HStack>
        </Flex>
        <QuizResultsTable
          singleOptionQs={questionData.singleOptionQs}
          multipleChoiceQs={questionData.multipleChoiceQs}
          flashcardQs={questionData.flashcardQs}
          correctSingle={correctAnswerData.singleOptionCorrect}
          correctMultiple={correctAnswerData.multipleChoiceCorrect}
          correctFlash={correctAnswerData.flashcardCorrect}
        />
        <Button
          size="lg"
          onClick={() => setSeeDetailedResults(!seeDetailedResults)}
        >
          {" "}
          See question and answers{" "}
        </Button>
        {seeDetailedResults ? (
          <QuizQATable
            quizData={quizData}
            currentAns={currentAns}
            correctFlashAns={correctFlashAns}
          />
        ) : null}
      </VStack>
    </>
  );
};

export default QuizResults;
