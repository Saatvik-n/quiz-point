import { Box, Center, HStack, VStack } from "@chakra-ui/layout";
import React, { useContext, useEffect, useReducer, useState } from "react";
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
  CurrentQuizData,
  questionTypes,
  QuizData,
  quizTypeState,
  validateError,
} from "../../Types/QuizTypes";

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
  checkAllOptionsFilled,
  makeQuizEditable,
  getQuestionInfo,
} from "../../Util/QuizUtilFunctions";
import api from "../../API/api";
import { useHistory } from "react-router";
import CurrentUserContext from "../../Contexts/GlobalContexts/UserContext";

export interface CreateQuizProps {
  isEdit?: boolean;
  quizID?: boolean;
}

const CreateQuiz: React.FC<CreateQuizProps> = (props) => {
  const { isEdit, quizID } = props;

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

  const { currentUserState } = useContext(CurrentUserContext);

  const history = useHistory();

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
        const res2 = checkAllOptionsFilled(
          currentQuestionState.multipleChoice.answerOptions!
        );
        if (res2 === false) {
          return "emptyError";
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

      case "Single Option": {
        if (
          checkAllOptionsFilled(
            currentQuestionState.singleOption.answerOptions!
          ) === false
        ) {
          return "emptyError";
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
      } else if (validationResult == "multipleError") {
        openModal("Make sure at least one option is checked");
      } else {
        openModal("Make sure all options have text in them");
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
      } else if (validationResult == "multipleError") {
        openModal("Make sure at least one option is checked");
      } else {
        openModal("Make sure all options have text in them");
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
    if (quizName.trim() === "") {
      openModal("Give the quiz a name");
      return;
    }
    let validationResult = validateCurrentOptions();
    if (validationResult !== "none") {
      if (validationResult === "flashError") {
        openModal("Make sure that the flashcard is not empty");
      } else if (validationResult == "multipleError") {
        openModal("Make sure at least one option is checked");
      } else {
        openModal("Make sure all options have text in them");
      }
      return;
    }
    setQuizFinished(true)
    // first, set the current quiz data to the current question in the quizData
    const currentQuestionClone = cloneDeep(currentQuestionState);

    // This copies the current question data to the current index in the array
    // Previous here actually just saves the question data to the given array
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

    cqsClone[currentQuestionNumber].flashcardText =
      currentQuestionClone.flashcardText;
    cqsClone[currentQuestionNumber].singleOption =
      currentQuestionClone.singleOption;
    cqsClone[currentQuestionNumber].multipleChoice =
      currentQuestionClone.multipleChoice;

    console.log(cqsClone);
    const finalQuizData = createQuizData(cqsClone, currentQuestionInfo);
    setFinishedQuizData(finalQuizData);

    if (isEdit === true) {
      console.log("User id is");
      
      console.log(currentUserState.userID);
      api.put(`/api/quiz/${quizID}`, {
          userID: currentUserState.userID,
          quizName: quizName,
          quizData: finalQuizData,
      } )
      .then(res => {
        console.log("Successfully edited quiz");
        history.push('/user')
      })
      .catch(err => {
        console.log("Failed to edit quiz");
      })
    } else {
      api
        .post(`/api/quiz`, {
          userID: currentUserState.userID,
          quizName: quizName,
          quizData: finalQuizData,
        })
        .then((res) => {
          console.log("Successfully sent quiz");
          history.push("/user");
        })
        .catch((err) => {
          console.log("failed to send quiz");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    api
      .get("/api/validate")
      .then((res) => {
        if (isEdit === true) {
          api
            .get(`/api/quiz/${quizID!}`)
            .then((res) => res.data.quiz)
            .then((data) => {
              setQuizName(data.quizName);
              const editableQuiz = makeQuizEditable(data.quizData);

              cqd({
                type: "edit",
                payload: editableQuiz,
              });
              setCurLength(data.quizData.length);
              setCurrentQuestionInfo(getQuestionInfo(data.quizData));

              currentQuestionDispatch({
                type: "changeQuestion",
                payload: editableQuiz[0],
              });
            });
        } else {
          currentQuestionDispatch({
            type: "changeQuestion",
            payload: cloneDeep(iqTemp),
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Validating");
        history.push("/loggedout");
      });
  }, []);

  if (loading) {
    return <div></div>;
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
            isDisabled={isEdit === undefined ? false : true}
            handleQuizNameChange={handleQuizNameChange}
          />
          {/* <IconButton
            pos="revert"
            zIndex={10}
            top="20"
            right="10px"
            aria-label="delete-question"
            backgroundColor="red.400"
            color="black"
            onClick={deleteQuestion}
            icon={<DeleteIcon color="white" />}
          /> */}
          <HStack
            marginTop="10px"
            width={{ base:"350px", sm: "500px", md: "710px" }}
            padding={{ base: "4px", md: "10px" }}
            boxShadow="-1px 0px 19px 3px rgba(207,206,206,0.69)"
            paddingBottom="30px"
          >
            <ArrowBackIcon
                  w={{base:6, md:9}}
                  h={{base:6, md:9}}
              visibility={currentQuestionNumber === 0 ? "hidden" : "initial"}
              cursor="pointer"
              onClick={() => prevClick()}
            />
            <CurrentQuizQuestionContextProvider
              value={currentQuestionStateValues}
            >
              <Box>
                <VStack width={{ base: "278px", sm:"400px", md: "600px" }}  >
                  <CurrentQuestionDisplay
                    currentQuestion={currentQuestionNumber}
                    totalQuestions={curLength}
                  />
                  <CreateQuestion
                    textValue={
                      currentQuestionInfo[currentQuestionNumber].questionText
                    }
                    handleChange={handleQuestionTextChange}
                    deleteQuestion={deleteQuestion}
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
                    w={{base:6, md:8}}
                    h={{base:6, md:8}}
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
                    width={{base:"150px", md:"200px"}}
                    colorScheme="green"
                    rightIcon={<CheckIcon />}
                    onClick={quizDone}
                    isLoading={quizFinished}
                  >
                    Finish
                  </Button>
                </VStack>
              </Box>
            </CurrentQuizQuestionContextProvider>
            {currentQuestionNumber + 1 === curLength ? (
              <AddIcon
                w={{base:6, md:9}}
                h={{base:6, md:9}}
                marginRight="10px"
                cursor="pointer"
                onClick={nextClick}
              />
            ) : (
              <ArrowForwardIcon
                w={{base:6, md:9}}
                h={{base:6, md:9}}
                marginRight="10px"
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
