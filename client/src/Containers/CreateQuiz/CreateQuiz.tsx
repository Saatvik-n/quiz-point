import { Box, Center, HStack, VStack } from "@chakra-ui/layout";
import React, { useEffect, useReducer, useState } from "react";
import CreateQuizHeader from "../../Components/CreateQuiz/CreateQuizComponents/CreateQuizHeader";

import cloneDeep from "clone-deep";

import {
  AddIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import CreateQuestion from "../../Components/CreateQuiz/CreateQuizComponents/CreateQuestion";
import CreateQuestionType from "../../Components/CreateQuiz/CreateQuizComponents/CreateQuestionType";
import {
  questionTypes,
  QuizData,
  quizTypeState,
  validateError,
} from "../../Types/QuizInterface";

import {
  CurrentQuizQuestionContextProvider,
  changeQuestionStateReducer,
  initialQuestionState,
} from "../../Contexts/CurrentQuizQuestionContext";

import CreateQuestionHelper from "./QuizQuestionContainer/CreateQuestionHelper";
import {
  currentQuizReducer,
  initialQuizState,
  iqTemp,
} from "../../Reducers/CurrentQuizReducer";
import { Button, IconButton } from "@chakra-ui/button";
import CurrentQuestionDisplay from "../../Components/CreateQuiz/CreateQuizComponents/CurrentQuestionDisplay";
import { useDisclosure } from "@chakra-ui/hooks";
import CreateQuizModal from "../../Components/CreateQuiz/CreateQuizComponents/CreateQuizModal";
import {
  checkAtLeastOneIsTrue,
  createQuizData,
} from "../../Util/QuizUtilFunctions";
import TakeQuiz from "../TakeQuiz/TakeQuiz";

export interface CreateQuizProps {}

const CreateQuiz: React.FC<CreateQuizProps> = () => {
  const [quizName, setQuizName] = useState("");

  // This stores question name, and type of question
  const [currentQuestionInfo, setCurrentQuestionInfo] = useState<quizTypeState>(
    [
      {
        questionText: "",
        questionType: "Single Option",
      },
    ]
  );

  // This is for the entire quiz state. Only reducer is used here
  const [cqs, cqd] = useReducer(currentQuizReducer, initialQuizState);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const [curLength, setCurLength] = useState(1);

  const [loading, setLoading] = useState(true);

  const [modalMessage, setModalMessage] = useState("");

  const [quizFinished, setQuizFinished] = useState(false);

  const [finishedQuizData, setFinishedQuizData] = useState<QuizData>();

  const { isOpen, onClose, onOpen } = useDisclosure();

  // This is for the state of the current question. Context and Reducer are used
  const [currentQuestionState, currentQuestionDispatch] = useReducer(
    changeQuestionStateReducer,
    initialQuestionState
  );

  const currentQuestionStateValues = {
    currentQuestionState,
    currentQuestionDispatch,
  };

  const handleQuizNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setQuizName(newVal);
  };

  const setButtonType = (type: questionTypes) => {
    const temp = cloneDeep(currentQuestionInfo);

    temp[currentQuestionNumber] = {
      ...temp[currentQuestionNumber],
      questionType: type,
    };

    setCurrentQuestionInfo(temp);
  };

  const handleQuestionTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const temp = cloneDeep(currentQuestionInfo);

    temp[currentQuestionNumber] = {
      ...temp[currentQuestionNumber],
      questionText: e.target.value,
    };
    setCurrentQuestionInfo(temp);
  };
  const openModal = (message: string) => {
    setModalMessage(message);
    onOpen();
  };

  const validateCurrentOptions = (): validateError => {
    switch (currentQuestionInfo[currentQuestionNumber].questionType) {
      case "Multiple Option": {
        const res = checkAtLeastOneIsTrue(
          currentQuestionState.multipleChoice.answerOptions!
        );
        if (res === false) {
          return "multipleError";
        }
        return "none";
      }
      case "Flashcard": {
        const res =
          currentQuestionState.flashcardText.flashcardAnswerText!.trim()
            .length > 0;
        if (res === false) {
          return "flashError";
        }
        return "none";
      }

      default:
        return "none";
    }
  };

  const nextClick = () => {
    let validationResult = validateCurrentOptions();
    if (validationResult !== "none") {
      if (validationResult === "flashError") {
        openModal("Make sure that the flashcard is not empty");
      } else {
        openModal("Make sure at least one option is checked");
      }
      return;
    }

    /**
     * Dispatch to the reducer, saying that we are creating another question.
     * It will do the following:
     * - take a copy of the currentQuestion state, and overwrite the value in the current index
     * - if this is the last question in the quiz, it creates a blank question, and pushes it to the array
     */
    cqd({
      type: "next",
      currentQuestion: currentQuestionNumber,
      payload: cloneDeep(currentQuestionState),
    });

    /**
     * When the user goes to another question, we need to save the type of question
     * he was last on and the question text for that question
     */
    let oldQuestionsInfo = [...currentQuestionInfo];
    oldQuestionsInfo[currentQuestionNumber] = {
      questionText: currentQuestionInfo[currentQuestionNumber].questionText,
      questionType: currentQuestionInfo[currentQuestionNumber].questionType,
    };

    if (currentQuestionNumber + 1 === curLength) {
      /**
       * For creating a new question, we have to set the current question to blank.
       * Here, cloneDeep is used as a safeguard
       */
      const iqTempClone = cloneDeep(iqTemp);

      /**
       * Since we are creating a new question, push the default question
       * (no question text, single option) to the question array
       */
      oldQuestionsInfo.push({
        questionText: "",
        questionType: "Single Option",
      });

      setCurrentQuestionInfo(oldQuestionsInfo);

      /**
       * Set the current Question to iqTempClone, which basically means set the
       * new question to the default question (blank)
       */
      currentQuestionDispatch({
        type: "changeQuestion",
        payload: iqTempClone,
      });

      // These are put last because they seem to be delayed when occuring for some reason
      setCurLength((old) => old + 1);
      setCurrentQuestionNumber((old) => old + 1);
    } else {
      // This is in case we are navigating to the next question, and not creating another one

      // A variable is declared here, because for some reason using setCurrentQuestionNumber takes a long time
      // for the currentQuestionNumber to update
      const nextQuestionNumber = currentQuestionNumber + 1;
      setCurrentQuestionInfo(oldQuestionsInfo);
      setCurrentQuestionNumber((old) => old + 1);

      /**
       * We get the question at the next index, and cloneDeep it just for safety
       * Then dispatch it so that we can see that question
       */
      const currentQuestionClone = cloneDeep(cqs[nextQuestionNumber]);
      currentQuestionDispatch({
        type: "changeQuestion",
        payload: currentQuestionClone,
      });
    }
  };

  const prevClick = () => {
    let validationResult = validateCurrentOptions();
    if (validationResult !== "none") {
      if (validationResult === "flashError") {
        openModal("Make sure that the flashcard is not empty");
      } else {
        openModal("Make sure at least one option is checked");
      }
      return;
    }
    // Clone the current question state, so that it can be saved to the array
    const currentQuestionClone = cloneDeep(currentQuestionState);
    // setCurrentQuestionNumber occurs with a delay, so just create a variable here
    const previousQuestionNumber = currentQuestionNumber - 1;

    /**
     * Dispatch the current question state, so that it is saved at the current question index
     */
    cqd({
      type: "previous",
      currentQuestion: currentQuestionNumber,
      payload: currentQuestionClone,
    });

    /**
     * Copy over any changes made in the question type or question text to
     * the questionInfo
     */
    let oldQuestionsInfo = cloneDeep(currentQuestionInfo);
    oldQuestionsInfo[previousQuestionNumber] = {
      questionText: currentQuestionInfo[previousQuestionNumber].questionText,
      questionType: currentQuestionInfo[previousQuestionNumber].questionType,
    };

    setCurrentQuestionInfo(oldQuestionsInfo);
    setCurrentQuestionNumber((old) => old - 1);

    // Clone the previous question, just for safety
    const previousQuestionClone = cloneDeep(cqs[previousQuestionNumber]);
    // Display the previous question data as output
    currentQuestionDispatch({
      type: "changeQuestion",
      payload: previousQuestionClone,
    });
  };

  const deleteQuestion = () => {
    if (curLength === 1) {
      setModalMessage("You cannot delete the only remaining question");
      onOpen();

      return;
    }
    /**
     * If you want to delete the first question, set the next one as the current question
     */
    let oldQuestionsInfo = cloneDeep(currentQuestionInfo);
    if (currentQuestionNumber === 0) {
      const nextQuestionData = cloneDeep(cqs[1]);
      oldQuestionsInfo.shift();
      cqd({
        type: "remove",
        currentQuestion: 0,
      });

      currentQuestionDispatch({
        type: "changeQuestion",
        payload: nextQuestionData,
      });

      setCurLength((old) => old - 1);
      setCurrentQuestionInfo(oldQuestionsInfo);
    } else {
      const prevQuestionData = cloneDeep(cqs[currentQuestionNumber - 1]);
      oldQuestionsInfo.splice(currentQuestionNumber, 1);
      cqd({
        type: "remove",
        currentQuestion: currentQuestionNumber,
      });

      currentQuestionDispatch({
        type: "changeQuestion",
        payload: prevQuestionData,
      });

      setCurLength((old) => old - 1);
      setCurrentQuestionInfo(oldQuestionsInfo);
      setCurrentQuestionNumber((old) => old - 1);
    }
  };

  const quizDone = () => {
    // first, set the current quiz data to the current question in the quizData
    const currentQuestionClone = cloneDeep(currentQuestionState);

    // This copies the current question data to the current index in the array
    // Previous here actually just saves the question data to the given array
    cqd({
      type: "previous",
      currentQuestion: currentQuestionNumber,
      payload: currentQuestionClone,
    });
    cqd({
      type: "previous",
      currentQuestion: currentQuestionNumber,
      payload: currentQuestionClone,
    });
    /**
     * Make the data from two sources: currentQuizState and currentQuestionInfo
     * currentQuizState - all the quiz data
     * currentQuestionInfo - contains the type of question for each question
     *  */

      console.log("Inside setTimeout");
      const cqsClone = cloneDeep(cqs);
      
      cqsClone[currentQuestionNumber].flashcardText = currentQuestionClone.flashcardText
      cqsClone[currentQuestionNumber].singleOption = currentQuestionClone.singleOption
      cqsClone[currentQuestionNumber].multipleChoice = currentQuestionClone.multipleChoice
      
      console.log(cqsClone);
      const finalQuizData = createQuizData(cqsClone, currentQuestionInfo);
      setFinishedQuizData(finalQuizData);
      setQuizFinished(true);



  };

  useEffect(() => {
    currentQuestionDispatch({
      type: "changeQuestion",
      payload: cloneDeep(iqTemp),
    });

    setLoading(false);
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (quizFinished) {
    return <TakeQuiz givenQuizData={finishedQuizData} />;
  }

  return (
    <>
      <Box height="7rem"></Box>
      <CreateQuizModal
        isOpen={isOpen}
        onClose={onClose}
        modalMessage={modalMessage}
      />
      <Center>
        <Box>
          <CreateQuizHeader
            quizName={quizName}
            handleQuizNameChange={handleQuizNameChange}
          />
          <IconButton
            pos="relative"
            zIndex={10}
            top="20"
            left="650"
            aria-label="delete-question"
            backgroundColor="red.400"
            color="black"
            onClick={deleteQuestion}
            icon={<DeleteIcon color="white" />}
          />
          <HStack
            marginTop="10px"
            width={{ base: "500px", md: "710px" }}
            padding={{ base: "4px", md: "10px" }}
            boxShadow="-1px 0px 19px 3px rgba(207,206,206,0.69)"
          >
            <ArrowBackIcon
              w={10}
              h={10}
              visibility={currentQuestionNumber === 0 ? "hidden" : "initial"}
              cursor="pointer"
              onClick={() => prevClick()}
            />
            <CurrentQuizQuestionContextProvider
              value={currentQuestionStateValues}
            >
              <Box>
                <VStack width={{ base: "80%", lg: "600px" }}>
                  <CurrentQuestionDisplay
                    currentQuestion={currentQuestionNumber}
                    totalQuestions={curLength}
                  />
                  <CreateQuestion
                    textValue={
                      currentQuestionInfo[currentQuestionNumber].questionText
                    }
                    handleChange={handleQuestionTextChange}
                  />
                  <CreateQuestionType
                    currentQuestionType={
                      currentQuestionInfo[currentQuestionNumber].questionType
                    }
                    setButtonType={setButtonType}
                  />
                </VStack>
                <CreateQuestionHelper
                  questionType={
                    currentQuestionInfo[currentQuestionNumber].questionType
                  }
                  openModal={openModal}
                />
                <VStack marginTop="20px" spacing="30px">
                  <AddIcon
                    w={8}
                    h={8}
                    cursor="pointer"
                    onClick={() =>
                      currentQuestionDispatch({
                        type: "add",
                        field:
                          currentQuestionInfo[currentQuestionNumber]
                            .questionType,
                      })
                    }
                    display={
                      currentQuestionInfo[currentQuestionNumber]
                        .questionType === "Flashcard"
                        ? "none"
                        : "inherit"
                    }
                  />
                  <Button
                    size="lg"
                    width="200px"
                    colorScheme="green"
                    rightIcon={<CheckIcon />}
                    onClick={quizDone}
                  >
                    Finish{" "}
                  </Button>
                </VStack>
              </Box>
            </CurrentQuizQuestionContextProvider>
            {currentQuestionNumber + 1 === curLength ? (
              <AddIcon
                w={9}
                h={9}
                marginRight={10}
                cursor="pointer"
                onClick={nextClick}
              />
            ) : (
              <ArrowForwardIcon
                w={10}
                h={10}
                marginRight={10}
                cursor="pointer"
                onClick={nextClick}
              />
            )}
          </HStack>
        </Box>
      </Center>
    </>
  );
};

export default CreateQuiz;
