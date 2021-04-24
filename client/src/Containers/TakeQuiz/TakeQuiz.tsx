import { Box, Center, HStack } from "@chakra-ui/layout";
import * as React from "react";
import { useState, useEffect } from "react";
import { Image } from "@chakra-ui/image";
import cloneDeep from "clone-deep";

import QuestionHeader from "../../Components/TakeQuiz/Headers/QuestionHeader";
import TakingQuizHeader from "../../Components/TakeQuiz/Headers/TakingQuizHeader";

import moveLeftIcon from "../../Components/svgs/Quiz/moveLeft.svg";
import moveRightIcon from "../../Components/svgs/Quiz/moveRight.svg";

// import { SampleQuiz } from "../../Data/SampleQuiz";

import { QuizData, AnswerArray } from "../../Types/QuizTypes";
import DecideType from "../../Components/TakeQuiz/DecideType";
import { Button } from "@chakra-ui/button";
import QuizResults from "../../Components/TakeQuiz/Result/QuizResults";
import { Spinner } from "@chakra-ui/spinner";
import api from "../../API/api";

export interface TakeQuizProps {
  givenQuizData?: QuizData;
  location?: any;
}

// This returns an array of unchecked checkboxes, unclicked radio buttons, empty texts
const initializeAnswerArray = (quizdata: QuizData): AnswerArray => {
  let resArray = [];
  for (let i = 0; i < quizdata.length; i++) {
    const currentQuestion = quizdata[i];
    if (
      currentQuestion.type === "Single Option" ||
      currentQuestion.type === "Multiple Option"
    ) {
      const numberOfQuestions = currentQuestion.answerOptions?.length;
      let tempArray = new Array(numberOfQuestions).fill(false);
      resArray.push(tempArray);
    } else {
      resArray.push("");
    }
  }
  return resArray;
};

const TakeQuiz: React.FC<TakeQuizProps> = (props) => {
  const { givenQuizData } = props;

  // Self explanatory
  const [quizName, setQuizName] = useState("");
  const [quizData, setQuizData] = useState<QuizData>(givenQuizData!);
  const [currentQuestion, setCurrent] = useState(0);
  const [isQuizFinished, setQuizFinished] = useState(false);
  const [quizLength, setQuizLength] = useState(0)

  // This holds the curent state of your answers: [[false, false, true], [true, true, false], "answer", ...]
  const [currentAns, setCurrentAns] = useState<AnswerArray>();

  // This holds whether the flashcard answers are correct or not (user marks them as correct )
  const [correctFlashAns, setCorrectFlashAns] = useState<Array<boolean>>();

  // This keeps track of the flashcard questions which have had their answers revealed
  const [shownAns, setShownAns] = useState<Array<boolean>>();

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    api
      .get(`/api/quiz/${props.location.state.quizID}`)
      .then((res) => res.data)
      .then((data) => {
        setQuizName(data.quizName);
        setQuizData(data.quizData);
        const initAnswerArray = initializeAnswerArray(quizData);
        setQuizLength(data.quizData.length)
        /**
         * Filling both of the flashcard related arrays with 'false' initially,
         * because none of them have been revealed or marked yet
         */
        const falseArray = new Array(quizLength).fill(false);
        setCorrectFlashAns(falseArray);
        setShownAns(falseArray);

        setCurrentAns(initAnswerArray);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error in fetching quiz in TakeQuiz");
      });
  }, []);

  const nextQuestion = () => {
    if (currentQuestion + 1 === quizLength - 1) {
      setCurrent(currentQuestion + 1);
      return;
    }
    const temp = currentQuestion;
    setCurrent(temp + 1);
  };

  const backQuestion = () => {
    setQuizFinished(false);
    if (currentQuestion === 0) {
      return;
    }
    const temp = currentQuestion;
    setCurrent(temp - 1);
  };

  /**
   * This function is for handling a click made by either a Radio or checkbox.
   * There are different ways to handle it for radio and CB.
   * Radio: For the current question, fill the current answer array with false, and set only 'index' to true, and set that as
   * the new currentAns
   * Checkbox: For the current question, keep the current answer array as it is, and only change the boolean
   * value of index, and set that
   */
  const handleClick = (index: number) => {
    let copy = cloneDeep(currentAns);
    if (quizData[currentQuestion].type === "Single Option") {
      const currentQuestionLength = currentAns![currentQuestion].length;
      let tempArray = new Array(currentQuestionLength).fill(false);
      tempArray[index] = true;
      copy![currentQuestion] = tempArray;
    } else {
      let tempArray = copy![currentQuestion] as boolean[];
      let tempVal = tempArray[index];
      tempArray[index] = !tempVal;
      copy![currentQuestion] = tempArray;
    }

    setCurrentAns(copy);
  };

  /**
   * This function will handle change in the textareas for the flash cards
   */
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let copy = cloneDeep(currentAns)!;
    let newTextVal = e.target.value;
    copy[currentQuestion] = newTextVal;
    setCurrentAns(copy);
  };

  /**
   * This sets the shown status of a flashcard to true.
   * This action cannot be undone, the button will disappear
   */
  const handleFlashcardShow = () => {
    const tempFlashcardShowVal = [...shownAns!];
    tempFlashcardShowVal[currentQuestion] = true;
    setShownAns(tempFlashcardShowVal);
  };

  /**
   * This sets the value in the particular flashcard question to true or false
   * No parameters need to be passed in because it already has access to the current question,
   * so it will just set that index to true or false
   */
  const handleFlashcardButton = () => {
    const curValue = correctFlashAns![currentQuestion];
    const correctFlashAnsCopy = [...correctFlashAns!];
    correctFlashAnsCopy![currentQuestion] = !curValue;
    setCorrectFlashAns(correctFlashAnsCopy);
  };

  if (isLoading) {
    return (
      <>
        <Box h="7rem"> </Box>
        <Center>
          <Spinner size="lg" />
        </Center>
      </>
    );
  }

  if (isQuizFinished) {
    return (
      <QuizResults
        quizData={quizData}
        currentAns={currentAns!}
        correctFlashAns={correctFlashAns!}
      />
    );
  }

  return (
    <>
      <Box height="9rem"></Box>
      <Center>
        <Box>
          <TakingQuizHeader quizName="quiz name" />
          <HStack
            marginTop="10px"
            width={{ base: "500px", md: "600px" }}
            padding={{ base: "4px", md: "10px" }}
            boxShadow="-1px 0px 19px 3px rgba(207,206,206,0.69)"
          >
            <Image
              src={moveLeftIcon}
              margin="auto 0px"
              cursor="pointer"
              visibility={currentQuestion === 0 ? "hidden" : "inherit"}
              onClick={backQuestion}
            />
            <Box width={{ base: "80%", lg: "500px" }}>
              <QuestionHeader
                questionName={quizData[currentQuestion].questionText}
                questionType={quizData[currentQuestion].type}
              />
              {
                /**
                 * All of the props sent here are for current question,
                 * there is no information sent about any other question
                 */
                <DecideType
                  currentArray={currentAns![currentQuestion] as boolean[]}
                  handleClick={handleClick}
                  quizType={quizData[currentQuestion].type}
                  answerTexts={quizData[currentQuestion].answerOptions!}
                  stringVal={currentAns![currentQuestion] as string}
                  handleTextChange={handleTextChange}
                  correctFlashAns={correctFlashAns![currentQuestion]}
                  handleFlashcardButton={handleFlashcardButton}
                  shownAns={shownAns![currentQuestion]}
                  handleFlashcardShow={handleFlashcardShow}
                  answerText={quizData[currentQuestion].flashcardAnswerText!}
                />
              }
              <Box height="40px"></Box> {/* Just for extra space */}
              <Center>
                <Button
                  display={
                    currentQuestion === quizLength - 1 ? "inherit" : "none"
                  }
                  size="lg"
                  textAlign="center"
                  colorScheme="teal"
                  onClick={() => setQuizFinished(true)}
                >
                  Submit
                </Button>
              </Center>
            </Box>
            <Image
              src={moveRightIcon}
              margin="auto 0px"
              cursor="pointer"
              visibility={
                currentQuestion === quizLength - 1 ? "hidden" : "inherit"
              }
              onClick={nextQuestion}
            />
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default TakeQuiz;
